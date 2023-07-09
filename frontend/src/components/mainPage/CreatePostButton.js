import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReactPlayer from 'react-player/lazy';
import { useOktaAuth } from '@okta/okta-react';
import validator from 'validator';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#009688',
    },
  },
});

const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', 
'😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', 
'🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', 
'🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', 
'🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', 
'😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', 
'😖', '😣', '😞', '😓', '😩', '😫', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', 
'☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', 
'😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', 
'💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', 
'🤎', '🖤', '🤍', '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💬', '👁️‍🗨️', 
'🗨️', '🗯️', '💭', '💤', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', 
'🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', 
'🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', 
'🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄', 
'👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👨‍🦰', '👨‍🦱', '👨‍🦳', '👨‍🦲', 
'👩', '👩‍🦰', '👩‍🦱', '👩‍🦳', '👩‍🦲', '👱‍♀️', '👱‍♂️', '🧓', '👴', '👵', 
'🙍', '🙍‍♂️', '🙍‍♀️', '🙎', '🙎‍♂️', '🙎‍♀️', '🙅', '🙅‍♂️', '🙅‍♀️', '🙆', 
'🙆‍♂️', '🙆‍♀️', '💁', '💁‍♂️', '💁‍♀️', '🙋', '🙋‍♂️', '🙋‍♀️', '🙇', '🙇‍♂️', 
'🙇‍♀️', '🤦', '🤦‍♂️', '🤦‍♀️', '🤷', '🤷‍♂️', '🤷‍♀️', '🧑‍⚕️', '👨‍⚕️', '👩‍⚕️', 
'🧑‍🎓', '👨‍🎓', '👩‍🎓', '🧑‍🏫', '👨‍🏫', '👩‍🏫', '🧑‍⚖️', '👨‍⚖️', '👩‍⚖️', 
'🧑‍🌾', '👨‍🌾', '👩‍🌾', '🧑'];

const CreatePostButton = () => {
  const { oktaAuth } = useOktaAuth();  
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(EditorState.createEmpty());
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [mediaUrl, setMediaUrl] = useState(''); //url given by user

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setMedia({
      file,
      type: file.type
    });
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    setMediaUrl('');
  };

  // Add this function to handle URL changes
  const handleMediaUrlChange = (event) => {
    setMediaUrl(event.target.value);
    setPreviewUrl(event.target.value);
    setMedia(null);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!media && !mediaUrl) {
      alert('Please select a media file to upload or enter a URL.');
      return;
    }
  
    let fileUrl;

    if (media) {
      // Get the pre-signed URL from the backend
      const response = await fetch('/api/aws/upload?fileType=' + encodeURIComponent(media.type), 
      {
        headers: {
        Authorization: 'Bearer ' + oktaAuth.getAccessToken()
      },});
      const { url, key } = await response.json();

      console.log(url);

      //upload the media file to the s3 bucket
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: media.file,
        headers: {
          'Content-Type': media.type
        }
      });

      if (!uploadResponse.ok) {
        alert('Failed to upload file.');
        return;
      }

      console.log('File uploaded:', key);

      fileUrl = url.split('?')[0];
    } else {
      if (validator.isURL(mediaUrl)) {
        fileUrl = mediaUrl;
      } else {
        alert("invalidUrl");
      }
    }

    let mediaType = '';
    if (media) {
      // user upload an image or video
      mediaType = media.type.startsWith('image') ? 'image' : 'video';
    } else {
      // user enters an url
      mediaType = mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) != null ? 'image' : 'video';
    }

    // Send the URL and other post data to the backend
    const postResponse = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + oktaAuth.getAccessToken()
      },
      body: JSON.stringify({
        title: title,
        text: JSON.stringify(convertToRaw(content.getCurrentContent())),
        mediaUrl: fileUrl,
        mediaType: mediaType,
        userId: 1 //TODO switch to true user id
      })
    });

    console.log('Post created:', postResponse.json())

    handleClose();
  };

  return (
    <div className="mt-4">
      <ThemeProvider theme={theme}>
        <div className="group">
            <Button variant="contained" color= "primary" onClick={handleClickOpen} disableElevation className="relative overflow-hidden transition-opacity duration-300 w-32 h-12">
                <AddCircleOutlineIcon className="absolute inset-0 m-auto opacity-100 group-hover:opacity-0 transition-opacity duration-300"/>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add Post
                </span>
            </Button>
        </div>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Post </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={handleTitleChange}
          />
          <Editor
              editorState={content}
              toolbar={{
                emoji: {
                  emojis: emojis,
                },
              }}
              onEditorStateChange={setContent}
              placeholder="What's on your mind?"
          />
          <TextField
            autoFocus
            margin="dense"
            id="media-url"
            label="Or enter media URL"
            type="url"
            fullWidth
            onChange={handleMediaUrlChange}
          />
          <Button variant="contained" component="label">
            Upload Image/Video
            <input type="file" accept="image/*,video/*" hidden onChange={handleMediaChange} />
          </Button>
          {previewUrl && media && media.type.startsWith('image/') && <img src={previewUrl} alt="Preview" style={{maxWidth: '100%', maxHeight: '200px'}} />}
          {previewUrl && media && media.type.startsWith('video/') && <ReactPlayer url={previewUrl} controls width='100%' height='200px' />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!media && !mediaUrl} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePostButton;