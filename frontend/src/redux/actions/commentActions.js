export const addComment = (postId, commentText) => {
    const newComment = {
        id: `${postId}-${commentText}-${Date.now()}`,
        postId,
        userId: 1,
        text: commentText,
        timestamp: Date.now(),
        replies: [],
    };


    return {
        type: 'ADD_COMMENT',
        payload: newComment,
    };
};

export const addReply = (parentId, replyText) => {
    const newReply = {
        id: `${parentId}-${replyText}-${Date.now()}`,
        parentId,
        userId: 1, // Replace with the appropriate user ID
        text: replyText,
        timestamp: Date.now(),
        replies: [],
    };

    return {
        type: 'ADD_REPLY',
        payload: newReply,
    };
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

export const fetchComments = (postId, accessToken) => async (dispatch) => {
    try {
        const response = await fetch(`/comments?postId=${postId}`, {
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
