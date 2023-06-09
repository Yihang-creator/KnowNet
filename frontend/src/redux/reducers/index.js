
import {combineReducers} from "@reduxjs/toolkit";

const initialState = {
    comments: [
        {
            id: 1,
            text: 'I love this blog!',
            timestamp: Date.now(),
            replies: []
        },
        {
            id: 2,
            text: 'I have a secret to tell you',
            timestamp: Date.now(),
            replies: [
                {
                    id: 1,
                    text: 'What is it?',
                    timestamp: Date.now()
                },
            ]
        },
    ]

};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            const newComment = {
                id: Date.now(),
                text: action.payload,
                timestamp: Date.now(),
                replies: [],
            };
            return {
                ...state,
                comments: [...state.comments, newComment],
            };
        case 'ADD_REPLY':
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.commentId
                        ? { ...comment, replies: [...comment.replies, action.payload.reply] }
                        : comment
                ),
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    comments: commentReducer,
});

export default rootReducer;
