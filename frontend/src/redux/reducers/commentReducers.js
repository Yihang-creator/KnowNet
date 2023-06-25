import _ from "lodash";

const initialState = {
  posts: [
    {
      id: 1,
      userId: 1,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      title: "Post Title 1",
      text: "This is the content of post 1.",
      like: 10,
    },
    {
      id: 2,
      userId: 1,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Post Title 2",
      text: "This is the content of post 2.",
      like: 2,
    },
    {
      id: 3,
      userId: 2,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
      title: "Post Title 3",
      text: "This is the content of post 3.",
      like: 0,
    },
    {
      id: 4,
      userId: 2,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Post Title 4",
      text: "This is the content of post 4.",
    },
    {
      id: 5,
      userId: 1,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
      title: "Post Title 5",
      text: "This is the content of post 5.",
      like: 0,
    },
    {
      id: 6,
      userId: 1,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "Post Title 6",
      text: "This is the content of post 6.",
      like: 0,
    },
    {
      id: 7,
      userId: 1,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
      title: "Post Title 7",
      text: "This is the content of post 7.",
      like: 0,
    },
    {
      id: 8,
      userId: 1,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      title: "Post Title 8",
      text: "This is the content of post 8.",
      like: 0,
    },
    {
      id: 9,
      userId: 1,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
      title: "Post Title 9",
      text: "This is the content of post 9.",
      like: 0,
    },
    {
      id: 10,
      userId: 1,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      title: "Post Title 10",
      text: "This is the content of post 10.",
      like: 0,
    },
    {
      id: 11,
      userId: 1,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
      title: "Post Title 11",
      text: "This is the content of post 11.",
      like: 0,
    },
    {
      id: 12,
      userId: 1,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      title: "Post Title 12",
      text: "This is the content of post 12.",
      like: 0,
    },
    {
      id: 13,
      userId: 1,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
      title: "Post Title 13",
      text: "This is the content of post 13.",
      like: 0,
    },
    {
      id: 14,
      userId: 1,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      title: "Post Title 14",
      text: "This is the content of post 14.",
      like: 0,
    },
    {
      id: 15,
      userId: 2,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      title: "Post Title 15",
      text: "This is the content of post 15.",
      like: 0,
    },
    {
      id: 16,
      mediaType: "image",
      userId: 2,
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.jpg",
      title: "Post Title 16",
      text: "This is the content of post 16.",
      like: 0,
    },
    {
      id: 17,
      userId: 2,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
      title: "Post Title 17",
      text: "This is the content of post 17.",
      like: 0,
    },
    {
      id: 18,
      userId: 2,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      title: "Post Title 18",
      text: "This is the content of post 18.",
      like: 0,
    },
    {
      id: 19,
      userId: 2,
      mediaType: "image",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
      title: "Post Title 19",
      text: "This is the content of post 19.",
      like: 0,
    },
    {
      id: 20,
      userId: 2,
      mediaType: "video",
      mediaUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      title: "Post Title 20",
      text: "This is the content of post 20.",
      like: 0,
    },
  ],
  users: [
    {
      id: 1,
      username: "johndoe",
      email: "johndoe@example.com",
    },
    {
      id: 2,
      username: "janedoe",
      email: "janedoe@example.com",
    },
  ],
  comments: [
    {
      id: 1,
      postId: 1,
      userId: 2,
      text: "I love this blog!",
      timestamp: "2023-06-08T00:00:00Z",
      replies: [],
    },
    {
      id: 2,
      postId: 1,
      userId: 1,
      text: "I have a secret to tell you",
      timestamp: "2023-06-08T00:05:00Z",
      replies: [
        {
          id: 4,
          parentId: 2,
          userId: 2,
          text: "What is it?",
          timestamp: "2023-06-08T00:06:00Z",
          replies: [],
        },
      ],
    },
    {
      id: 3,
      postId: 2,
      userId: 1,
      text: "Nice post!",
      timestamp: "2023-06-08T00:10:00Z",
      replies: [],
    },
  ],
};

const addReplyToComment = (comments, action) => {
  return comments.map((comment) => {
    if (comment.id === action.payload.parentId) {
      return {
        ...comment,
        replies: [...comment.replies, action.payload],
      };
    } else if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, action),
      };
    }
    return comment;
  });
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

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "ADD_REPLY":
      return {
        ...state,
        comments: addReplyToComment(state.comments, action),
      };
    case "FETCH_COMMENTS_SUCCESS":
      return { ...state, comments: action.payload };
    case "FETCH_COMMENTS_FAILURE":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LIKE":
      return {
        ...state,
        posts: addLike(state.posts, action.payload),
      };
    case "CANCEL_LIKE":
      return {
        ...state,
        posts: cancelLike(state.posts, action.payload),
      };
    default:
      return state;
  }
};
