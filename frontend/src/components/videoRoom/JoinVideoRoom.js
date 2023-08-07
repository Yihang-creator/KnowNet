import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import VideoQueue from './VideoQueue';
import {
  Button,
  TextField,
  Divider,
  Typography,
  Box,
  Stack,
  Grid,
  Avatar,
  Snackbar
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useTheme, useMediaQuery} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const userColors = [
  '#000000', // Black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#800080', // Purple
  '#FFC0CB', // Pink
  '#00FFFF', // Cyan
  '#FF69B4', // Hot Pink
  '#008000', // Dark Green
  '#800000', // Maroon
  '#000080', // Navy
  '#FF4500', // Orange Red
  '#9400D3', // Dark Violet
  '#4B0082', // Indigo
  '#2E8B57', // Sea Green
  '#BA55D3', // Medium Orchid
  '#4682B4', // Steel Blue
  '#8B0000', // Dark Red
];

function getTextColorForBackground(bgColor) {
  // Extract the RGB components from the color string
  const r = parseInt(bgColor.substr(1, 2), 16);
  const g = parseInt(bgColor.substr(3, 2), 16);
  const b = parseInt(bgColor.substr(5, 2), 16);

  // Calculate the relative luminance
  const relativeLuminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Choose white or black based on the relative luminance
  return relativeLuminance > 0.5 ? '#000000' : '#FFFFFF';
}

const JoinVideoRoom = (props) => {
  const [duration, setDuration] = useState(props.duration);
  const [url, setUrl] = useState(
    props.url || 'https://www.youtube.com/watch?v=QZw-rgaQVfI', //default url
  );
  const isJoin = props.is_join || false;
  const [playing, setPlaying] = useState(props.playing);
  const [addUrl, setAddUrl] = useState('');
  const [chats, setChats] = useState(props.chats);
  const [curMsg, setCurMsg] = useState('');
  const [userColorMap, setUserColorMap] = useState(new Map());
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useTheme();
  const { queue, setQueue } = props;
  const username = props.username;

  const ref = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    props.backend.socket.on('set-url', (url) => {
      setUrl(url);
    });

    props.backend.socket.on('play-toggled', (state) => {
      setPlaying(state);
    });

    props.backend.socket.on('url-set', (url) => {
      setUrl(url);
    });

    props.backend.socket.on('seek-set', (duration) => {
      if (Math.abs(duration - duration) > 2) {
        setDuration(duration);
      }
    });

    props.backend.socket.on('chat-added', (message) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    props.backend.socket.on('update-queue', (newQueue) => {
      setQueue(newQueue);
    });

  }, [props.backend.socket, setQueue]);

  useEffect(() => {
    if (Math.abs(duration - duration) > 2) {
      ref.current.seekTo(duration, 'seconds');
    }
    scrollToBottom();
  }, [duration]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && curMsg.trim() !== '') {
      props.backend.addChat({
        text: curMsg.trim(),
        time: new Date(),
      });
      setCurMsg('');
      scrollToBottom();
      evt.preventDefault();
    }
  };

  const playVideo = () => {
    props.backend.togglePlay(true);
  };

  const onPlay = () => {
    if (!isJoin) {
      playVideo();
    }
  };

  const onPause = () => {
    if (!isJoin) {
      props.backend.togglePlay(false);
    }
  };

  const onProgress = (dur) => {
    setDuration(dur['playedSeconds']);
    if (!isJoin) {
      props.backend.setSeek(dur['playedSeconds']);
    }
  };

  const onSeek = (seconds) => {
    setDuration(seconds);
    props.backend.setSeek(seconds);
  };

  const onReady = () => {
    if (isJoin) {
      ref.current.seekTo(duration, 'seconds');
    }
  };

  const handleAddUrlChange = (event) => {
    setAddUrl(event.target.value);
  };

  const addVideo = () => {
    props.backend.addVideo(addUrl);
    setAddUrl('');
  };

  const getUserColor = (user) => {
    if (userColorMap.has(user)) {
      return userColorMap.get(user);
    } else {
      const colorIndex = Math.floor(Math.random() * userColors.length);
      const userColor = userColors[colorIndex];
      userColorMap.set(user, userColor);
      setUserColorMap(new Map(userColorMap)); // Update state with the new userColorMap
      return userColor;
    }
  };

  const handleTimeStamp = (time) => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    let formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
    return formattedDate;
  };

  let queue_control = '';
  if (!isJoin) {
    queue_control = (
      <>
        <TextField
          label="Video URL"
          width="100%"
          variant="outlined"
          fullWidth
          value={addUrl}
          onChange={handleAddUrlChange}
        />
        <Button variant="contained" color="primary" onClick={addVideo}>
          Add Video Url
        </Button>
      </>
    );
  }

  const [open, setOpen] = useState(false)

  const copyRoomId = () => {
    navigator.clipboard.writeText(props.backend.state.roomId)
    setOpen(true)
  }

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Box flex={2}>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ width: '100%', position: 'sticky', top: '86px' }}
          >
            <ReactPlayer
              ref={ref}
              url={url}
              controls={!isJoin} // Only host can control
              light={false}
              onPlay={onPlay}
              onPause={onPause}
              onProgress={onProgress}
              playing={playing}
              onSeek={onSeek}
              onReady={onReady}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              py={2}
              style={{
                color: darkMode
                  ? theme.palette.text.secondary
                  : theme.palette.text.primary,
              }}
            >
              Room ID: {props.backend.state.roomId}
              <ContentCopyIcon style= {{cursor: 'pointer'}} onClick={copyRoomId}></ContentCopyIcon>
            </Typography>
            <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
            {queue_control}
            <Box
              display="flex"
              flexDirection="column"
              overflow="auto"
              sx={{ maxHeight: '90vh' }}
            >
              <VideoQueue
                changeVideo={(vid) => {
                  props.backend.setURL(vid);
                }}
                queue={queue}
                is_join={isJoin}
              />
            </Box>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          flexDirection="column"
          overflow="auto"
          sx={{ maxHeight: '80vh', flex: 1, display: 'flex' }}
        >
          <Typography
            variant="h5"
            mt={2}
            style={{
              color: darkMode
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            }}
          >
            <Box display="flex" alignItems="center">
              <ChatIcon sx={{ mr: 2 }} />
              Chat Room
            </Box>
          </Typography>
          <div ref={chatRef} style={{ overflowY: 'auto' }} color="primary">
            {chats.map((msg, idx) => {
              const userColor = getUserColor(msg.user);
              const textColor = getTextColorForBackground(userColor);

              return (
                <Box
                  key={idx}
                  display="flex"
                  justifyContent={
                    msg.user === username ? 'flex-end' : 'flex-start'
                  }
                  mb={2}
                >
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-end"
                    direction={msg.user === username ? 'row-reverse' : 'row'}
                  >
                    <Grid item>
                      <Avatar sx={{ bgcolor: userColor, color: textColor }}>
                        {msg.user.substring(0, 1).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Box
                        px={2}
                        py={1}
                        borderRadius={20}
                        sx={{ bgcolor: userColor, color: textColor }}
                      >
                        <Typography variant="body2">{msg.user}</Typography>
                        <Typography variant="body2">{msg.text}</Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        align={msg.user === username ? 'right' : 'left'}
                      >
                        {handleTimeStamp(msg.time)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </div>
          <TextField
            variant="outlined"
            multiline
            rows={2}
            label="Enter your message here"
            value={curMsg}
            onChange={(evt) => setCurMsg(evt.target.value)}
            onKeyDown={handleKeyDown}
            mb={2}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default JoinVideoRoom;
