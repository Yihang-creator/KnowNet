export const addComment = (postId, commentText) => {
    const newComment = {
        id: `${postId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: commentText,
        timestamp: Date.now(),
        replies: [],
    };

    return {
        type: 'ADD_COMMENT',
        payload: newComment,
    };
};

export const addReply = (commentId, replyText) => {
    const newReply = {
        id: `${commentId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: replyText,
        timestamp: Date.now(),
        replies: [],
    };

    return {
        type: 'ADD_REPLY',
        payload: {
            commentId,
            reply: newReply,
        },
    };
};

export const fetchComments = (postId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8080/comments?postId=${postId}`);
        const data = await response.json();
        dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_COMMENTS_FAILURE', error });
    }
};
