export const updateUser = (userId) => {
  return {
    type: "UPDATE_USER",
    payload: userId,
  };
};

export const updateFollowingAndFollowers = (data) => {
  return {
    type: "FAF_UPDATE",
    payload: data,
  };
};

export const fetchFollowingsAndFollowers = (userId, accessToken) => {
  return (dispatch) => {
    fetch(`/api/users/${userId}/faf`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("API call failed");
        return response.json();
      })
      .then((data) => {
        dispatch(updateFollowingAndFollowers(data));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
};
