export const addLike = (postInfo) => {
    return {
        type: 'ADD_LIKE',
        payload: postInfo,
    };
};

export const cancelLike = (postInfo) => {
    return {
        type: 'CANCEL_LIKE',
        payload: postInfo,
    };
};

export const changeLike = (post, isCancel, userID, accessToken) => async (dispatch) => {
    let changedPost = JSON.parse(JSON.stringify(post));
    if (!isCancel) {
        changedPost.like.push(userID)
    } else {
        changedPost.like = post.like.filter(userId => userId !== userID);
    }

    console.log(post.postId);
    
    try {
        const response = await fetch(`/api/posts/${post.postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify(changedPost)
        });
        const data = await response.json();
        console.log(data);

        const postId = data.postId

        if (!isCancel) {
            dispatch(addLike({postId, userID}));
        } else {
            dispatch(cancelLike({postId, userID}));
        }
        
    } catch (error) {
       console.log(error);
    }
};

export const addComment = (postId, userId, commentText, accessToken) => async (dispatch) => {
    const newComment = {
        postId,
        userId,
        text: commentText,
        timestamp: Date.now(),
        replies: [],
    };

    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify(newComment)
        });
        const data = await response.json();

        dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: data });

        // Fetch the updated comments after adding a new comment
        dispatch(fetchComments(postId, accessToken));
    } catch (error) {
        dispatch({ type: 'ADD_COMMENT_FAILURE', error });
    }
};

export const addReply = (postId, userId, commentId, commentText, replyTo, isSecLevelComment, accessToken) => async (dispatch) => {
    const newComment = {
        text: commentText,
        timestamp: Date.now(),
        isSecLevelComment
    };

    try {
        // use id 1 for now
        const response = await fetch(`/api/comments/replies/${commentId}/${userId}/${replyTo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify(newComment)
        });
        const data = await response.json();

        dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: data });

        // Fetch the updated comments after adding a new comment
        dispatch(fetchComments(postId, accessToken));
    } catch (error) {
        dispatch({ type: 'ADD_COMMENT_FAILURE', error });
    }
};

export const fetchComments = (postId, accessToken) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/getCommentDetail?postId=${postId}`, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        const data = await response.json();
        dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_COMMENTS_FAILURE', error });
    }
};

export const fetchLikes = (postId, commentId, replyId, userId, accessToken) => async (dispatch) => {
    const params = {
        postId,
        commentId,
        replyId,
        userId
    }
    try {
        const response = await fetch(`/api/comments/updateLikes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify(params)
        });
        const data = await response.json();
        dispatch({ type: 'FETCH_LIKES_SUCCESS', payload: {
                ...data
            } });
        return data;
    } catch (error) {
        dispatch({ type: 'FETCH_LIKES_FAILURE', error });
        return {
            code: '1',
            msg: 'updateLikes error!'
        };
    }
};

