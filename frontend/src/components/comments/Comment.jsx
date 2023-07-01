import React, {useState} from 'react';
import {Avatar, Box, Typography, Button, TextField} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import IconButton from "@mui/material/IconButton";
import '../../Styles/Comment.css';

const currentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month}-${day}`;
}

const Comment = ({ user, timestamp, text, likes, replies }) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [showReplies, setShowReplies] = useState(false);
    const [reply, setReply] = useState('');
    const [isSecLevelComment, setSecLevelComment] = useState(false) // if it is a second level comment
    const [replyUserId, setReplyUserId] = useState('') // should be userId, use username for now

    const handleLike = () => {
        setLikeCount(likeCount + 1);
    };

    const toggleReplies = (userId, secLevelComment) => {
        // the userId is the user who is being replied to
        setShowReplies(!showReplies);
        setSecLevelComment(!!secLevelComment)
        setReplyUserId(userId)
    };

    const { username = "", userPhotoUrl = "" } = user || {};

    return (
        <Box display="flex" alignItems="flex-start" marginBottom={2} sx={{ padding: 2, borderRadius: 4, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Avatar src={userPhotoUrl} alt={username} />
            <Box marginLeft={2} flexGrow={1}>
                <Typography variant="subtitle1">{username}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {timestamp}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {text}
                </Typography>
                <Box display="flex" alignItems="center">
                    <Box>
                        <IconButton onClick={toggleReplies} sx={{ fontSize: 'x-small' }}>
                            <ReplyIcon />reply
                        </IconButton>
                    </Box>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Button
                            variant="text"
                            color="primary"
                            startIcon={<ThumbUpIcon />}
                            onClick={handleLike}
                        >
                            {likeCount}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ marginLeft: 4 }}>
                    {replies.map((review) => (
                        <Box
                            key={review.id}
                            sx={{
                                display: 'flex',
                                paddingLeft: 2,
                                marginTop: 1,
                            }}
                        >
                            <Avatar src={review.user?.userPhotoUrl} alt={review.user?.username} />
                            <Box marginLeft={2}>
                                <Typography variant="subtitle2">{review.user?.username}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {review.timestamp}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {/* reply to */}
                                    { review.replyTo ? (<span>Reply <span className='text-gray-400'>{review.replyTo.username}:</span>  {review.text}</span>) : review.text }
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    {/* reply to second level comment */}
                                    <Box>
                                        {/* should be userid, use user name for now */}
                                        <IconButton onClick={() => toggleReplies(review.user?.username, 'secLevelComment')} sx={{ fontSize: 'x-small' }}>
                                            <ReplyIcon />reply
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
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
                            <Avatar src={'https://example.com/avatar2.jpg'} alt={'self'} />
                            <Box marginLeft={2} flexGrow={1}>
                                <Typography variant="subtitle2">{'self'}</Typography>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                        {currentDateTime()}
                                        {
                                            isSecLevelComment && replyUserId ? <span>   Reply To {replyUserId}</span> : null
                                        }
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
                                <Button variant="contained" color="primary" onClick={() => {}} sx={{ marginTop: 1 }}>
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

export default Comment;
