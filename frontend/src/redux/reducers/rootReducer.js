import { combineReducers } from "@reduxjs/toolkit";
import { commentReducer, likeReducer } from "./commentReducers";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  comments: commentReducer,
  likes: likeReducer,
  userReducer,
  post: postReducer,
});

export default rootReducer;
