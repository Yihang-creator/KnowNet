import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  List,
  ListItem,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useMediaQuery, useTheme } from '@mui/material';

const VideoQueue = (props) => {
  const queue = props.queue;
  const [current, setCurrent] = useState(0);
  const { changeVideo, is_join = false } = props;

  const makeList = () => {
    return queue.map((vid, idx) => {
      return (
        <ListItem
          key={idx}
          onClick={() => {
            if (!is_join) {
              setCurrent(idx);
              changeVideo(vid);
            }
          }}
          disablePadding
        >
          <ListItemButton
            selected={current === idx}
            onClick={() => setCurrent(idx)}
          >
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <ListItemText primary={vid.toString().substring(0, 50)} />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const theme = useTheme();
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <>
      <Tooltip
        title={
          'Only host will be able to add videos to this queue. Enter the video URL and press the ADD VIDEO URL button. Host can click on a video link to switch to that Video'
        }
        placement="bottom-start"
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mt={2}
          style={{
            color: darkMode
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          }}
        >
          Video Queue
          <IconButton aria-label="help">
            <HelpOutlineIcon />
          </IconButton>
        </Typography>
      </Tooltip>
      <List>{makeList()}</List>
    </>
  );
};

export default VideoQueue;
