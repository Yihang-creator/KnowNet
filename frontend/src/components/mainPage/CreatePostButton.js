import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useTheme } from '@mui/material/styles';
import PostEdit from './postEdit';


const CreatePostButton = () => { 
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem key={'Create Post'} disablePadding onClick={handleClickOpen}>
        <ListItemButton>
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <AddCircleOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary={'Create Post'} sx={{ color: theme.palette.text.primary }}/>
        </ListItemButton>
      </ListItem>
      <PostEdit open={open} handleClose={handleClose}/>
    </div>
  );
}

export default CreatePostButton;