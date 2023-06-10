import { combineReducers } from "@reduxjs/toolkit";

const initialState = {
    comments: []
};

const addReplyToComment = (comments, action) => {
    return comments.map(comment => {
        if (comment.id === action.payload.commentId) {
            return { ...comment, replies: [...comment.replies, action.payload.reply] };
        }
        if (comment.replies.length > 0) {
            return { ...comment, replies: addReplyToComment(comment.replies, action) };
        }
        return comment;
    });
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        case 'ADD_REPLY':
            return {
                ...state,
                comments: addReplyToComment(state.comments, action),
            };
        case 'FETCH_COMMENTS_SUCCESS':
            return { ...state, comments: action.payload };
        case 'FETCH_COMMENTS_FAILURE':
            return { ...state, error: action.error }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    comments: commentReducer,
});

export default rootReducer;
