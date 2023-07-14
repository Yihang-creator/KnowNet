const userReducer = (state = [], action) => {
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

    case "FAF_UPDATE":
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
