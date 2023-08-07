import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUserContext } from '../auth/UserContext';
import { Link, useParams } from 'react-router-dom';
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
  const { talkTo } = useParams();
  const [textValue, setTextValue] = useState('');
  const { oktaAuth } = useOktaAuth();
  const socket = useRef();
  const talkToRef = useRef(talkTo);
  const messageBoxRef = useRef(null);
  const selfPage = `${userInfo.userId}personal`;

  const chatState = useSelector((state) => state.chatReducer);

  const talkToUser = chatState.people.find((user) => talkTo === user.userId);

  const scrollToBottom = () => {
    messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState]);

  useEffect(() => {
    talkToRef.current = talkTo;
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

      dispatch(
        fetchChat(
          userInfo.userId,
          talkToRef.current,
          oktaAuth.getAccessToken(),
        ),
      );
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSend = () => {
    socket.current.emit('privateMessage', {
      recipientUserId: talkTo,
      message: textValue,
    });

    const date = new Date();
    dispatch(
      send({
        userId: userInfo.userId,
        text: textValue,
        time: `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate(),
        ).padStart(2, '0')} ${date
          .toLocaleString('en-US', {timeZone: "America/Los_Angeles"}, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          .toLowerCase()}`,
      }),
    );

    setTextValue('');
  };

  return (
    <Layout>
      <div>
        <Grid container sx={{ width: '100%', height: '80vh' }}>
          <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
            <List>
              <Link to={`/chat/${userInfo.userId}personal`}>
                <ListItemButton selected={talkTo === selfPage}>
                  <ListItemIcon>
                    <Avatar
                      alt={userInfo.username}
                      src={userInfo.userPhotoUrl}
                    />
                  </ListItemIcon>
                  <ListItemText primary={`Personal Space`}></ListItemText>
                </ListItemButton>
              </Link>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}></Grid>
            <Divider />
            <List>
              {chatState.people.map((person) => {
                return (
                  <Link to={`/chat/${person.userId}`}>
                    <ListItemButton selected={talkTo === person.userId}>
                      <ListItemIcon>
                        <Avatar
                          alt={person.username}
                          src={person.userPhotoUrl}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={person.username}
                        sx={{ overflow: 'auto' }}
                      >
                        {person.username}
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </Grid>

          <Grid item xs={9}>
            <List>
              <Link
                to={
                  talkToUser
                    ? `/profile/${talkToUser.userId}`
                    : `/profile/${userInfo.userId}`
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar
                      alt={talkToUser ? talkToUser.username : userInfo.username}
                      src={
                        talkToUser
                          ? talkToUser.userPhotoUrl
                          : userInfo.userPhotoUrl
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      talkToUser ? talkToUser.username : 'Personal Space'
                    }
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </List>

            <Divider />
            <Grid item sx={{ height: '65vh', overflowY: 'auto' }}>
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
              <div ref={messageBoxRef}></div>
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
                    onKeyUp={(e) => {
                      if (e.key === 'Enter' && textValue.trim() !== '') {
                        handleSend();
                      }
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
                      if (textValue.trim() !== '') {
                        handleSend();
                      }
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
