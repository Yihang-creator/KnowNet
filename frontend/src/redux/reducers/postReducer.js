import _ from "lodash";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POST":
      const existingIndex = state.findIndex(post => post.id === action.payload.id);
      if (existingIndex !== -1) {
        // Post already exists, update it
        const updatedState = [...state];
        updatedState[existingIndex] = action.payload;
        return updatedState;
      } else {
        // Post doesn't exist, add it to the list
        return [...state, action.payload];
      }
    case "SET_ALL_POSTS":
      return action.payload;
    case "ADD_LIKE":
      return addLike(state, action.payload);
    case "CANCEL_LIKE":
      return cancelLike(state, action.payload);
    default:
      return state;
  }
};

const addLike = (posts, postID) => {
  let deep = _.cloneDeep(posts);
  for (let post of deep) {
    if (post.id === postID) {
      post.like = post.like + 1;
      break;
    }
  }
  return deep;
};

const cancelLike = (posts, postID) => {
  let deep = _.cloneDeep(posts);
  for (let post of deep) {
    if (post.id === postID) {
      post.like = post.like - 1;
      break;
    }
  }
  return deep;
};

export default postReducer;



