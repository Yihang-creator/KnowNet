import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUserContext } from '../auth/UserContext';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Layout from './mainPage/Layout';
import { fetchChat, send } from '../redux/actions/chatActions';
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import io from 'socket.io-client';

const Chat = () => {
  const { userInfo } = useUserContext();
  const dispatch = useDispatch();
  const [talkTo, setTalkTo] = useState(userInfo.userId);
  const [textValue, setTextValue] = useState('');
  const { oktaAuth } = useOktaAuth();
  const socket = useRef();

  const chatState = useSelector((state) => state.chatReducer);

  useEffect(() => {
    dispatch(fetchChat(userInfo.userId, talkTo, oktaAuth.getAccessToken()));
  }, [talkTo]);

  useEffect(() => {
    socket.current = io('', {
      path: '/socket/chat',
      auth: { userId: userInfo.userId },
    });

    socket.current.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.current.on('privateMessage', ({ senderUserId, message }) => {
      console.log(`Received private message from ${senderUserId}: ${message}`);

      if (senderUserId === talkTo) {
        setTimeout(
          () =>
            dispatch(
              fetchChat(userInfo.userId, talkTo, oktaAuth.getAccessToken()),
            ),
          2000,
        );
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <Layout>
      <div>
        <Grid container sx={{ width: '100%', height: '80vh' }}>
          <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt={userInfo.username} src={userInfo.userPhotoUrl} />
                </ListItemIcon>
                <ListItemText primary={userInfo.username}></ListItemText>
              </ListItemButton>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              {chatState.people.map((person) => {
                return (
                  <ListItemButton
                    onClick={() => {
                      setTalkTo(person.userId);
                    }}
                    selected={talkTo === person.userId}
                  >
                    <ListItemIcon>
                      <Avatar alt={person.username} src={person.userPhotoUrl} />
                    </ListItemIcon>
                    <ListItemText
                      primary={person.username}
                      sx={{ overflow: 'auto' }}
                    >
                      {person.username}
                    </ListItemText>
                  </ListItemButton>
                );
              })}
            </List>
          </Grid>

          <Grid item xs={9}>
            <Grid item sx={{ height: '70vh', overflowY: 'auto' }}>
              <List>
                {chatState.messages.map((m) => {
                  return (
                    <ListItem>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align={
                              m.userId === userInfo.userId ? 'right' : 'left'
                            }
                            primary={m.text}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align={
                              m.userId === userInfo.userId ? 'right' : 'left'
                            }
                            secondary={m.time}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>

            <Divider />

            <Grid>
              <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                  <TextField
                    value={textValue}
                    onChange={(event) => {
                      setTextValue(event.target.value);
                    }}
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} align="right">
                  <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                      console.log(textValue);
                      socket.current.emit('privateMessage', {
                        recipientUserId: talkTo,
                        message: textValue,
                      });
                      dispatch(
                        send({
                          userId: userInfo.userId,
                          text: textValue,
                          time: new Date().toLocaleTimeString(),
                        }),
                      );

                      setTextValue('');
                    }}
                  >
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Chat;
