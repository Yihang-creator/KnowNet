import { combineReducers } from 'redux';

const initialState = {
    comments: [],
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    comments: commentReducer,
});

export default rootReducer;
