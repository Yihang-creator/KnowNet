const userReducer = (state = [], action) => {
  switch (action.type) {
    case "FAF_TOGGLE":
      if (action.payload.listType === "followings") {
        let followings = state.followings;

        let updatedFollowings = followings.map((user) => {
          if (user.userId === action.payload.userId) {
            if (user.status === "following") {
              return { ...user, status: "unfollowing" };
            } else {
              return { ...user, status: "following" };
            }
          } else {
            return user;
          }
        });

        return {
          ...state,
          followings: updatedFollowings,
        };
      } else {
        let followers = state.followers;

        let updatedFollowers = followers.map((user) => {
          if (user.userId === action.payload.userId) {
            if (user.status === "following") {
              return { ...user, status: "unfollowing" };
            } else {
              return { ...user, status: "following" };
            }
          } else {
            return user;
          }
        });

        return {
          ...state,
          followers: updatedFollowers,
        };
      }

    case "FAF_UPDATE":
      let followings = action.payload.followings;

      let followers = action.payload.followers;

      let followingIds = followings.map((user) => {
        return user.userId;
      });

      let updatedFollowings = followings.map((user) => {
        return { ...user, status: "following" };
      });

      let updatedFollowers = followers.map((user) => {
        if (followingIds.includes(user.userId)) {
          return { ...user, status: "following" };
        } else {
          return { ...user, status: "unfollowing" };
        }
      });
      return {
        followers: updatedFollowers,
        followings: updatedFollowings,
      };

    default:
      return state;
  }
};

export default userReducer;
