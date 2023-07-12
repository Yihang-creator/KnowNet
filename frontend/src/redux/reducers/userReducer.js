const initialState = {
  followers: [
    { id: 0, name: "Kunyi", description: "455 student" },
    { id: 1, name: "Hanze", description: "455 student" },
    { id: 2, name: "Yihang", description: "455 student" },
    { id: 3, name: "Bill", description: "455 student" },
  ],

  followings: [
    { id: 4, name: "Elon Musk", description: "455 student", remove: false },
    { id: 5, name: "Bill Gates", description: "455 student", remove: false },
    { id: 6, name: "Jeff Bezos", description: "455 student", remove: false },
    { id: 0, name: "Kunyi", description: "455 student", remove: false },
    { id: 1, name: "Hanze", description: "455 student", remove: false },
    { id: 2, name: "Yihang", description: "455 student", remove: false },
    { id: 3, name: "Bill", description: "455 student", remove: false },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      var newFollowings = state.followings.map((u) => {
        if (u.id === action.payload) {
          return { ...u, remove: !u.remove };
        }

        return u;
      });

      return {
        ...state,
        followings: newFollowings,
      };

    case "FOLLOWINGS_UPDATE":
      var newFollowings = state.followings.filter((u) => !u.remove);

      return {
        ...state,
        followings: newFollowings,
      };

    default:
      return state;
  }
};

export default userReducer;
