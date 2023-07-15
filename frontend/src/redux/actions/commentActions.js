
export const addReply = (parentId, replyText, accessToken) => async (dispatch) => {
    const newReply = {
        parentId,
        userId: 1, // Replace with the appropriate user ID
        text: replyText,
        timestamp: Date.now(),
        replies: [],
    };

    try {
        const response = await fetch(`/api/comments/${parentId}/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify(newReply)
        });
        const data = await response.json();

        dispatch({ type: 'ADD_REPLY_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'ADD_REPLY_FAILURE', error });
    }
};


export const addLike = (postID) => {
    return {
        type: 'ADD_LIKE',
        payload: postID,
    };
};

export const cancelLike = (postID) => {
    return {
        type: 'CANCEL_LIKE',
        payload: postID,
    };
};

export const addComment = (postId, commentText, accessToken) => async (dispatch) => {
    const newComment = {
        postId,
        userId: 1,
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

export const addSecLevelComment = (postId, commentId, commentText, replyTo, isSecLevelComment, accessToken) => async (dispatch) => {
    const newComment = {
        text: commentText,
        timestamp: Date.now(),
        isSecLevelComment
    };

    try {
        // use id 1 for now
        const response = await fetch(`/api/comments/replies/${commentId}/3/${replyTo}`, {
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

