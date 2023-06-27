import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ReactPlayer from 'react-player/lazy';
import { useOktaAuth } from '@okta/okta-react';

const CreatePostButton = () => {
  const { authState } = useOktaAuth();  
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!media) {
      alert('Please select a media file to upload.');
      return;
    }

    // Get the pre-signed URL from the backend
    const response = await fetch('/api/aws/upload?fileType=' + encodeURIComponent(media.type), 
    {
      headers: {
      Authorization: 'Bearer ' + authState.accessToken.accessToken
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

    // Get the URL of the uploaded file
    const fileUrl = url.split('?')[0];

    // Send the URL and other post data to the backend
    const postResponse = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authState.accessToken.accessToken
      },
      body: JSON.stringify({
        title: title,
        text: content,
        mediaUrl: fileUrl,
        mediaType: media.type.startsWith('image') ? 'image' : 'video',
        userId: 1 //TODO switch to true user id
      })
    });

    console.log('Post created:', postResponse.json())

    handleClose();
  };

  return (
    <div className="mt-4">
      <Button variant="contained" color= "primary" onClick={handleClickOpen} disableElevation>
        Add Post
      </Button>
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
          <TextField
            margin="dense"
            id="content"
            label="What's on your mind?"
            type="text"
            fullWidth
            multiline
            rows={8}
            onChange={handleTextChange}
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
          <Button onClick={handleSubmit} disabled={!media} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePostButton;