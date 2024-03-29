import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Divider,
  Tab,
  Tabs,
  Snackbar,
  Alert,
} from '@mui/material';
import { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import validator from 'validator';
import { createEditorStateFromText } from './PostContent';
import InteractiveVideoBuilder from '../interactiveVideo/InteractiveVideoBuilder';
import { useUserContext } from '../../auth/UserContext';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { setPost } from '../../redux/actions/PostActions';
import { useDispatch } from 'react-redux';
import { awsUploader } from '../utils/awsUploader';
import CircularProgress from '@mui/material/CircularProgress';

const emojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😜',
  '🤪',
  '😝',
  '🤑',
  '🤗',
  '🤭',
  '🤫',
  '🤔',
  '🤐',
  '🤨',
  '😐',
  '😑',
  '😶',
  '😏',
  '😒',
  '🙄',
  '😬',
  '🤥',
  '😌',
  '😔',
  '😪',
  '🤤',
  '😴',
  '😷',
  '🤒',
  '🤕',
  '🤢',
  '🤮',
  '🤧',
  '🥵',
  '🥶',
  '🥴',
  '😵',
  '🤯',
  '🤠',
  '🥳',
  '😎',
  '🤓',
  '🧐',
  '😕',
  '😟',
  '🙁',
  '☹️',
  '😮',
  '😯',
  '😲',
  '😳',
  '🥺',
  '😦',
  '😧',
  '😨',
  '😰',
  '😥',
  '😢',
  '😭',
  '😱',
  '😖',
  '😣',
  '😞',
  '😓',
  '😩',
  '😫',
  '😤',
  '😡',
  '😠',
  '🤬',
  '😈',
  '👿',
  '💀',
  '☠️',
  '💩',
  '🤡',
  '👹',
  '👺',
  '👻',
  '👽',
  '👾',
  '🤖',
  '😺',
  '😸',
  '😹',
  '😻',
  '😼',
  '😽',
  '🙀',
  '😿',
  '😾',
  '🙈',
  '🙉',
  '🙊',
  '💋',
  '💌',
  '💘',
  '💝',
  '💖',
  '💗',
  '💓',
  '💞',
  '💕',
  '💟',
  '❣️',
  '💔',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🤎',
  '🖤',
  '🤍',
  '💯',
  '💢',
  '💥',
  '💫',
  '💦',
  '💨',
  '🕳️',
  '💣',
  '💬',
  '👁️‍🗨️',
  '🗨️',
  '🗯️',
  '💭',
  '💤',
  '👋',
  '🤚',
  '🖐️',
  '✋',
  '🖖',
  '👌',
  '🤏',
  '✌️',
  '🤞',
  '🤟',
  '🤘',
  '🤙',
  '👈',
  '👉',
  '👆',
  '🖕',
  '👇',
  '☝️',
  '👍',
  '👎',
  '✊',
  '👊',
  '🤛',
  '🤜',
  '👏',
  '🙌',
  '👐',
  '🤲',
  '🤝',
  '🙏',
  '✍️',
  '💅',
  '🤳',
  '💪',
  '🦾',
  '🦿',
  '🦵',
  '🦶',
  '👂',
  '🦻',
  '👃',
  '🧠',
  '🦷',
  '🦴',
  '👀',
  '👁️',
  '👅',
  '👄',
  '👶',
  '🧒',
  '👦',
  '👧',
  '🧑',
  '👱',
  '👨',
  '🧔',
  '👨‍🦰',
  '👨‍🦱',
  '👨‍🦳',
  '👨‍🦲',
  '👩',
  '👩‍🦰',
  '👩‍🦱',
  '👩‍🦳',
  '👩‍🦲',
  '👱‍♀️',
  '👱‍♂️',
  '🧓',
  '👴',
  '👵',
  '🙍',
  '🙍‍♂️',
  '🙍‍♀️',
  '🙎',
  '🙎‍♂️',
  '🙎‍♀️',
  '🙅',
  '🙅‍♂️',
  '🙅‍♀️',
  '🙆',
  '🙆‍♂️',
  '🙆‍♀️',
  '💁',
  '💁‍♂️',
  '💁‍♀️',
  '🙋',
  '🙋‍♂️',
  '🙋‍♀️',
  '🙇',
  '🙇‍♂️',
  '🙇‍♀️',
  '🤦',
  '🤦‍♂️',
  '🤦‍♀️',
  '🤷',
  '🤷‍♂️',
  '🤷‍♀️',
  '🧑‍⚕️',
  '👨‍⚕️',
  '👩‍⚕️',
  '🧑‍🎓',
  '👨‍🎓',
  '👩‍🎓',
  '🧑‍🏫',
  '👨‍🏫',
  '👩‍🏫',
  '🧑‍⚖️',
  '👨‍⚖️',
  '👩‍⚖️',
  '🧑‍🌾',
  '👨‍🌾',
  '👩‍🌾',
  '🧑',
];

const PostEdit = (props) => {
  const { open, handleClose, post } = props;
  const { oktaAuth } = useOktaAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(''); //url given by user
  const [selectedTab, setSelectedTab] = useState(0);
  const { userInfo } = useUserContext();
  const { userId } = userInfo;
  const [dialogTitle, setDialogTitle] = useState('New Post');
  const [snackBarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [tags, setTags] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [uploading, setUploading] = useState(false); // whether upload is in progress or not
  const dispatch = useDispatch();

  const convertTagsToString = function (tags) {
    let string = '';
    if (!tags || tags.length === 0) return string;
    for (let tag of tags) {
      string = string + ' ' + tag;
    }
    return string;
  };

  const user_image = userInfo == null ? null : userInfo.userPhotoUrl;
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      var enrichedText =
        typeof post.text === 'undefined'
          ? EditorState.createEmpty()
          : createEditorStateFromText(post.text);
      setContent(enrichedText);
      setMediaUrl(post.mediaUrl.trim());
      setPreviewUrl(post.mediaUrl.trim());
      setTags(convertTagsToString(post.tags));
      if (post?.interactiveVideos && post.interactiveVideos.length > 0) {
        setSelectedTab(1);
      }
      setDialogTitle('Edit Post');
    } else {
      // reset state variables to initial values when post becomes null or undefined
      setTitle('');
      setContent(EditorState.createEmpty());
      setMediaUrl('');
      setPreviewUrl(null);
      setTags('');
    }
  }, [post, handleClose]);

  useEffect(() => {
    // when window switch to open, make sure button is correctly disabled or enabled
    if (open) {
      setSubmitButtonDisabled(!media && !mediaUrl);
    }
  }, [media, mediaUrl, open]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    setMedia({
      file,
      type: file.type,
    });
    setPreviewUrl(URL.createObjectURL(file));
    setMediaUrl('');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Add this function to handle URL changes
  const handleMediaUrlChange = (event) => {
    setMediaUrl(event.target.value.trim());
    setPreviewUrl(event.target.value.trim());
    setMedia(null);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const turnTagListTotags = (tags) => {
    return tags.trim().split(' ');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitButtonDisabled(true);
    setUploading(true);

    if (!media && !mediaUrl) {
      alert('Please select a media file to upload or enter a URL.');
      return;
    }

    let fileUrl;

    if (media) {
      // Get the pre-signed URL from the backend
      let mediaAWSUrl = await awsUploader(media, oktaAuth.getAccessToken());
      if (mediaAWSUrl !== null) {
        fileUrl = mediaAWSUrl;
      } else {
        alert('Failed to upload file.');
        return;
      }
    } else {
      if (validator.isURL(mediaUrl)) {
        fileUrl = mediaUrl;
      } else {
        alert('invalidUrl');
      }
    }

    let mediaType = '';
    if (media) {
      // user upload an image or video
      mediaType = media.type.startsWith('image') ? 'image' : 'video';
    } else {
      // user enters an url
      mediaType =
        mediaUrl.match(/\.(jpeg|jpg|gif|png|image).*$/) != null
          ? 'image'
          : 'video';
    }

    if (!post) {
      // Send the URL and other post data to the backend
      let postResponse = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + oktaAuth.getAccessToken(),
        },
        body: JSON.stringify({
          title: title,
          text: JSON.stringify(convertToRaw(content.getCurrentContent())),
          mediaUrl: fileUrl,
          mediaType: mediaType,
          tags: turnTagListTotags(tags),
          userId: userId,
          userPhotoUrl: user_image,
          username: userInfo.username,
        }),
      });
      setUploading(false);
      if (postResponse.ok) {
        const body = await postResponse.json();
        dispatch(setPost(body));
        setMessage('Upload succeeded');
        setSeverity('success');
        handleClose();
      } else {
        const { error } = await postResponse.json();
        setMessage(error);
        setSeverity('error');
      }
    } else {
      // Send the URL and other post data to the backend
      let putResponse = await fetch(`/api/posts/${post.postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + oktaAuth.getAccessToken(),
        },
        body: JSON.stringify({
          title: title,
          text: JSON.stringify(convertToRaw(content.getCurrentContent())),
          mediaUrl: fileUrl,
          mediaType: mediaType,
          tags: turnTagListTotags(tags),
          userId: userId,
          userPhotoUrl: user_image,
          username: userInfo.username,
        }),
      });
      setUploading(false);
      if (putResponse.ok) {
        const body = await putResponse.json();
        dispatch(setPost(body));
        setMessage('Update succeeded');
        setSeverity('success');
        handleClose();
      } else {
        const { error } = await putResponse.json();
        setMessage(error);
        setSeverity('error');
      }
    }
    setSnackbarOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="lg"
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">{dialogTitle} </DialogTitle>
        <div>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Post" icon={<PostAddIcon />} iconPosition="top" />
            <Tab
              label="Interactive Video"
              icon={<VideogameAssetIcon />}
              iconPosition="top"
            />
          </Tabs>
        </div>
        {selectedTab === 0 && (
          <div>
            <DialogContent dividers={true}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                onChange={handleTitleChange}
                text="true"
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
                editorStyle={{ height: '320px' }}
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
                <input
                  type="file"
                  accept="image/*,video/*"
                  hidden
                  onChange={handleMediaChange}
                />
              </Button>
              {previewUrl && media && media.type.startsWith('image/') && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              )}
              {previewUrl && media && media.type.startsWith('video/') && (
                <ReactPlayer
                  url={previewUrl}
                  controls
                  width="100%"
                  height="200px"
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitButtonDisabled}
                color="primary"
              >
                Post
                {uploading && <CircularProgress size={24} />}
              </Button>
            </DialogActions>
          </div>
        )}
        {selectedTab === 1 && (
          <DialogContent dividers={true}>
            <InteractiveVideoBuilder
              handleClose={handleClose}
              post={post}
              setMessage={setMessage}
              setSnackbarOpen={setSnackbarOpen}
              setSeverity={setSeverity}
            />
          </DialogContent>
        )}
      </Dialog>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostEdit;
