import { combineReducers } from '@reduxjs/toolkit';
import { commentReducer } from './commentReducers';
import userReducer from './userReducer';
import postReducer from './postReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  comments: commentReducer,
  userReducer,
  chatReducer,
  posts: postReducer,
});

export default rootReducer;
