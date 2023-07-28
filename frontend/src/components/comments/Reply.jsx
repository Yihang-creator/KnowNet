import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import { connect } from 'react-redux';
import { addReply, fetchLikes } from '../../redux/actions/commentActions';
import { useOktaAuth } from '@okta/okta-react';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IconButton from "@mui/material/IconButton";
import { useUserContext } from '../../auth/UserContext';
import '../../Styles/Comment.css';

const handleTimeStamp = (time) => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // JavaScript's months are O-indexed.
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    day = day <10 ?'0'+ day : day;
    hour = hour < 10 ? '0'+ hour : hour;
    minute = minute < 10 ?'0' + minute : minute;
    let formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
    return formattedDate;
}

const Reply = ({ review, toggleReplies, commentId, postId, fetchLikes }) => {
    const { id, user, timestamp, replyToUser, likes, text, likedBy, replyId } = review;
    const { userInfo } = useUserContext();
    const { oktaAuth } = useOktaAuth();
    const { userPhotoUrl: currentUserPhotoUrl, username: currentUsername, userId: currentUserId } = userInfo || {}; // 当前用户信息
    const [currentLikes, setLikes] = useState(likes)
    const [secondLikeStatus, setSecondLikeStatus] = useState(false)

    useEffect(() => {
        const isUserLike = likedBy?.includes(currentUserId)
        setSecondLikeStatus(isUserLike)
    }, userInfo)

    const handleSetLikesStatus = () => {
        setSecondLikeStatus(!secondLikeStatus)
        setLikes(likedBy?.includes(currentUserId) ? currentLikes - 1 : currentLikes + 1)
        fetchLikes(postId, commentId, replyId, currentUserId, oktaAuth)
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
                    { replyToUser?.username ? (<span>reply to <span className='text-gray-400'>{replyToUser.username}:</span>  {text}</span>) : review.text }
                </Typography>
                <Box display="flex" alignItems="center">
                    {/* reply to second level comment */}
                    <Box>
                        {/* should be userid, use username for now */}
                        <IconButton onClick={() => toggleReplies(user?.userId, user?.username, 'secLevelComment')} sx={{ fontSize: 'x-small' }}>
                            <ReplyIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ marginLeft: '30px' }}>
                        <Button
                            variant="text"
                            color="primary"
                            startIcon={secondLikeStatus ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                            onClick={handleSetLikesStatus}
                        >
                            {currentLikes}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => ({
    comments: state.comments.comments,
});

const mapDispatchToProps = {
    addSecLevelComment: addReply,
    fetchLikes
};

export default connect(mapStateToProps, mapDispatchToProps)(Reply);