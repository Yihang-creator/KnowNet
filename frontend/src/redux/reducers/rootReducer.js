import { combineReducers } from "@reduxjs/toolkit";
import { commentReducer, likeReducer } from "./commentReducers";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  comments: commentReducer,
  likes: likeReducer,
  userReducer,
});

export default rootReducer;
