
export const addComment = (comment) => {
    return {
        type: 'ADD_COMMENT',
        payload: comment
    };
};

export const addReply = (commentId, replyText) => {
    return {
        type: 'ADD_REPLY',
        payload: {
            commentId,
            reply: {
                id: Date.now(),
                text: replyText,
                timestamp: Date.now(),
            },
        },
    };
};

export const fetchComments = (postId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8080/comments?postId=${postId}`)
        const data = await response.json();
        dispatch({type:'FETCH_COMMENTS_SUCCESS',payload: data});
    } catch (error) {
        dispatch({type:'FETCH_COMMENTS_FAILURE', error});
    }
}
