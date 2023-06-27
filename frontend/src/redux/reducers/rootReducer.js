import { combineReducers } from "@reduxjs/toolkit";
import { commentReducer} from "./commentReducers";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  comments: commentReducer,
  userReducer,
  posts: postReducer,
});

export default rootReducer;
