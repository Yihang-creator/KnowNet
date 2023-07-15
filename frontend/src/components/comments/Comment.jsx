import React, {useCallback, useState} from 'react';
import {Avatar, Box, Typography, Button, TextField} from '@mui/material';
import { connect } from 'react-redux';
import { addSecLevelComment } from '../../redux/actions/commentActions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useOktaAuth } from '@okta/okta-react';
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

const handleTimeStamp = (time) => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // JavaScript months are O-indexed.
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    // Pad the month, day, hour and minute with leading zeros if neededmonth = month < 10 ?0' + month : month;
    day = day <10 ?'0'+ day : day;
    hour = hour < 10 ? '0'+ hour : hour;
    minute = minute < 10 ?'0' + minute : minute;
    let formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
    return formattedDate;
}

const SecondLevelReview = (props) => {
    const { review, toggleReplies } = props;
    const { id, user, timestamp, replyToUser, likes, text } = review;
    const [secondLikeCount, setSecondLikeCount] = useState(parseInt(likes))

    const handleSetLikesCount = () => {
        setSecondLikeCount(secondLikeCount + 1)
    }

    return (
        <Box
            key={id}
            sx={{
                display: 'flex',
                paddingLeft: 2,
                marginTop: 1,
            }}
        >
            <Avatar src={user?.userPhotoUrl} alt={user?.username} />
            <Box marginLeft={2}>
                <Typography variant="subtitle2">{user?.username}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {handleTimeStamp(timestamp)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {/* reply to */}
                    { replyToUser?.username ? (<span>Reply <span className='text-gray-400'>{replyToUser.username}:</span>  {text}</span>) : review.text }
                </Typography>
                <Box display="flex" alignItems="center">
                    {/* reply to second level comment */}
                    <Box>
                        {/* should be userid, use user name for now */}
                        <IconButton onClick={() => toggleReplies(user?.userId, user?.username, 'secLevelComment')} sx={{ fontSize: 'x-small' }}>
                            <ReplyIcon />reply
                        </IconButton>
                    </Box>
                    <Box sx={{ marginLeft: '30px' }}>
                        <Button
                            variant="text"
                            color="primary"
                            startIcon={<ThumbUpIcon />}
                            onClick={handleSetLikesCount}
                        >
                            {secondLikeCount}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const Comment = ({ user, timestamp, text, likes, replies, addSecLevelComment, commentId, postId }) => {
    const [likeCount, setLikeCount] = useState(parseInt(likes));
    const [showReplies, setShowReplies] = useState(false);
    const [reply, setReply] = useState('');
    const [isSecLevelComment, setSecLevelComment] = useState(false) // if it is a second level comment
    const [replyUserInfo, setReplyUserInfo] = useState({}) // should be userId, use username for now
    const { oktaAuth } = useOktaAuth();

    const handleLike = () => {
        setLikeCount(likeCount + 1);
    };

    const toggleReplies = (userId, username, secLevelComment) => {
        // the userId is the user who is being replied to
        setShowReplies(!showReplies);
        setSecLevelComment(!!secLevelComment)
        setReplyUserInfo({userId, username})
    };

    const hanleSubmit = useCallback(() => {
        // isSecLevelComment: if it is a second level comment
        addSecLevelComment(postId, commentId, reply, replyUserInfo.userId, isSecLevelComment, oktaAuth)
    }, [oktaAuth, reply, replyUserInfo, isSecLevelComment])

    const { userId, username = "", userPhotoUrl = "" } = user || {};

    return (
        <Box display="flex" alignItems="flex-start" marginBottom={2} sx={{ padding: 6, borderRadius: 4, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Avatar src={userPhotoUrl} alt={username} />
            <Box marginLeft={2} flexGrow={1}>
                <Typography variant="subtitle1">{username}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {handleTimeStamp(timestamp)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {text}
                </Typography>
                <Box display="flex" alignItems="center">
                    <Box>
                        <IconButton onClick={() => toggleReplies(userId, username)} sx={{ fontSize: 'x-small' }}>
                            <ReplyIcon />reply
                        </IconButton>
                    </Box>
                    <Box sx={{ marginLeft: '30px' }}>
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
                        <SecondLevelReview review={review} toggleReplies={toggleReplies} />
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
                                            isSecLevelComment && replyUserInfo.username ? <span>   Reply To {replyUserInfo.username}</span> : null
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
                                <Button variant="contained" color="primary" onClick={hanleSubmit} sx={{ marginTop: 1 }}>
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
    addSecLevelComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);