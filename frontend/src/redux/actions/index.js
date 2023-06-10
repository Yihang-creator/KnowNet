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


export const fetchComments = (postId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8080/comments?postId=${postId}`);
        const data = await response.json();
        dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_COMMENTS_FAILURE', error });
    }
};
