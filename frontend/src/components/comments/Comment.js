import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { addReply, fetchLikes } from '../../redux/actions/commentActions';
import { useOktaAuth } from '@okta/okta-react';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import Reply from './Reply';
import { useUserContext } from '../../auth/UserContext';
import handleTimeStampWithoutAgo from '../utils/calculateTimeAgo';


const currentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}-${month}-${day}`;
};


const Comment = ({
  user,
  timestamp,
  text,
  likes,
  likedBy,
  replies,
  addSecLevelComment,
  fetchLikes,
  commentId,
  postId,
}) => {
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState('');
  const [isSecLevelComment, setSecLevelComment] = useState(false); // if it is a second level comment
  const [replyUserInfo, setReplyUserInfo] = useState({}); // should be userId, use username for now
  const { oktaAuth } = useOktaAuth();
  const { userInfo } = useUserContext();
  const {
    userPhotoUrl: currentUserPhotoUrl,
    username: currentUsername,
    userId: currentUserId,
  } = userInfo || {}; // current userinfo
  const [currentLikes, setLikes] = useState(likes);
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    const isUserLike = likedBy?.includes(currentUserId);
    setLikeStatus(isUserLike);
  }, [currentUserId, likedBy, oktaAuth]);

  const handleLike = () => {
    setLikeStatus(!likeStatus);
    setLikes(
      likedBy?.includes(currentUserId) ? currentLikes - 1 : currentLikes + 1,
    );
    fetchLikes(postId, commentId, '', currentUserId, oktaAuth.getAccessToken());
  };

  const toggleReplies = (userId, username, secLevelComment) => {
    setShowReplies(!showReplies);
    setSecLevelComment(!!secLevelComment);
    setReplyUserInfo({ userId, username });
  };

  const handleSubmit = useCallback(() => {
    // isSecLevelComment: if it is a second level comment
    addSecLevelComment(
      postId,
      userInfo.userId,
      commentId,
      reply,
      replyUserInfo.userId,
      isSecLevelComment,
      oktaAuth.getAccessToken(),
    ).then(() => {
      setReply('');
      setShowReplies(!showReplies);
    });
  }, [
    addSecLevelComment,
    postId,
    userInfo.userId,
    commentId,
    reply,
    replyUserInfo.userId,
    isSecLevelComment,
    oktaAuth.getAccessToken(),
    showReplies,
  ]);

  const { userId, username = '', userPhotoUrl = '' } = user || {};

  const showUserInfo = (userInfo) => {
    navigate(`/profile/${userInfo.userId}`);
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      marginBottom={2}
      sx={{
        padding: 6,
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Avatar
        src={userPhotoUrl}
        alt={username}
        sx={{ cursor: 'pointer' }}
        onClick={() => showUserInfo(user)}
      />
      <Box marginLeft={2} flexGrow={1}>
        <Typography variant="subtitle1">{username}</Typography>
        <Typography variant="body2" color="text.secondary">
          {handleTimeStampWithoutAgo(timestamp)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box>
            <IconButton
              onClick={() => toggleReplies(userId, username)}
              sx={{ fontSize: 'x-small' }}
            >
              <ReplyIcon />
              reply
            </IconButton>
          </Box>
          <Box sx={{ marginLeft: '30px' }}>
            <Button
              variant="text"
              color="primary"
              startIcon={
                likeStatus ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )
              }
              onClick={handleLike}
            >
              {currentLikes}
            </Button>
          </Box>
        </Box>
        <Box sx={{ marginLeft: 4 }}>
          {replies.map((review) => (
            <Reply
              review={review}
              toggleReplies={toggleReplies}
              commentId={commentId}
              postId={postId}
              showUserInfo={showUserInfo}
            />
          ))}
          {showReplies && (
            <Box
              key={5}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                paddingLeft: 2,
                marginTop: 1,
              }}
            >
              {/* commenting */}
              <Avatar src={currentUserPhotoUrl} alt={currentUsername} />
              <Box marginLeft={2} flexGrow={1}>
                <Typography variant="subtitle2">{currentUsername}</Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    {currentDateTime()}
                    {isSecLevelComment && replyUserInfo.username ? (
                      <span> Reply To {replyUserInfo.username}</span>
                    ) : null}
                  </Typography>
                </Box>
                <TextField
                  id="comment-input"
                  label="Write a comment"
                  variant="outlined"
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  multiline
                  rows={2}
                  fullWidth
                  sx={{ marginTop: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ marginTop: 1 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

const mapDispatchToProps = {
  addSecLevelComment: addReply,
  fetchLikes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);