import _ from "lodash";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POST":
      return setPost(state, action.payload);
    case "SET_ALL_POSTS":
      return action.payload;
    case "ADD_LIKE":
      // console.log(state);
      return addLike(state, action.payload);
    case "CANCEL_LIKE":
      return cancelLike(state, action.payload);
    default:
      return state;
  }
};

const testId = "3";

const setPost = (state, postContent) => {
  const existingIndex = state.findIndex(post => post.postId === postContent.postId);
  if (existingIndex !== -1) {
    // Post already exists, update it
    const updatedState = [...state];
    updatedState[existingIndex] = postContent;
    return updatedState;
  } else {
    // Post doesn't exist, add it to the list
    return [...state, postContent];
  }
};


const addLike = (state, postID) => {
    let deep = _.cloneDeep(state);
    const postIndex = deep.findIndex(post => post.postId === postID);
    if (postIndex !== -1) {
      // Post already exists, update it
      deep[postIndex].like.push(testId);
    } 
    return deep;
};

const cancelLike = (state, postID) => {
  let deep = _.cloneDeep(state);
    const postIndex = deep.findIndex(post => post.postId === postID);
    if (postIndex !== -1) {
      // Post already exists, update it
      deep[postIndex].like = deep[postIndex].like.filter(userId => userId !== testId);
    } 
    return deep;
};

export default postReducer;



