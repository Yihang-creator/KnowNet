import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Divider } from "@mui/material";
import { useEffect } from "react";
import ReactPlayer from 'react-player/lazy'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import validator from 'validator';
import { createEditorStateFromText } from "../PostContent";
import { useUserContext } from "../../auth/UserContext";


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



const PostEdit = (props) => {

    const { open, handleClose, post } = props;
    const { oktaAuth } = useOktaAuth();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState(EditorState.createEmpty());
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); 
    const [mediaUrl, setMediaUrl] = useState(''); //url given by user
    const [tags, setTags] = useState(null);

    const { userInfo } = useUserContext();
    const user_image = userInfo == null ? null : userInfo.userPhotoUrl;

    useEffect(() => {
        if (post) {
          console.log(post);
          setTitle(post.title);
          var enrichedText = typeof post.text === 'undefined' ? EditorState.createEmpty() : createEditorStateFromText(post.text);
          setContent(enrichedText);
          setMediaUrl(post.mediaUrl);
          setPreviewUrl(post.mediaUrl);
        } else {
          // reset state variables to initial values when post becomes null or undefined
          setTitle("");
          setContent(EditorState.createEmpty());
          setMediaUrl("");
          setPreviewUrl(null);
        }
      }, [post]);

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
        console.log(event.target.value);
        setMediaUrl(event.target.value);
        setPreviewUrl(event.target.value);
        setMedia(null);
      };

      const handleTagsChange = (event) => {
        setTags(event.target.value);
      };

      const turnTagListTotags = (tags) => {
        return tags.split(" ");
      }
    
    
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
        let postResponse;
        
        if (!post) {
            // Send the URL and other post data to the backend
            postResponse = await fetch('/api/posts', {
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
                tags: turnTagListTotags(tags),
                userId: userInfo.userId,
                userPhotoUrl: user_image,
                username: userInfo.username
                })
            });
        } else {
            // Send the URL and other post data to the backend
            postResponse = await fetch(`/api/posts/${post.postId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + oktaAuth.getAccessToken()
                },
                body: JSON.stringify({
                title: title,
                text: JSON.stringify(convertToRaw(content.getCurrentContent())),
                mediaUrl: fileUrl,
                mediaType: mediaType,
                tags: turnTagListTotags(tags),
                userId: userInfo.userId,
                userPhotoUrl: user_image,
                username: userInfo.username
                })
            });
        }

        const response = postResponse.json();
        console.log('Post created:', response)
        handleClose();
      };

    return (
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
                text
                value={title}
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
                editorStyle={{ height: '300px' }} 
            />
            <Divider />
            <TextField
                margin="dense"
                id="media-url"
                label="Enter media URL"
                type="url"
                fullWidth
                value={mediaUrl}
                onChange={handleMediaUrlChange}
            />
            <TextField
                margin="dense"
                id="outlined-basic"
                label="Add tags, separate each tag by space."
                fullWidth
                value={tags}
                onChange={handleTagsChange}
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
    );
}

export default PostEdit;