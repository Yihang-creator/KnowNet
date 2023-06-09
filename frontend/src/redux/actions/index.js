
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
