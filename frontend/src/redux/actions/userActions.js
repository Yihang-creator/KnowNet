export const updateUser = (userId) => {
  return {
    type: "UPDATE_USER",
    payload: userId,
  };
};

export const updateFollowings = () => {
  return {
    type: "FOLLOWINGS_UPDATE",
  };
};
