export const toggleFollowingAndFollowers = (userId, type) => {
  return {
    type: "FAF_TOGGLE",
    payload: { userId: userId, listType: type },
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

export const updateFollowings = (userId, accessToken) => {
  return (dispatch, getState) => {
    const state = getState();

    console.log(state);

    let data = state.userReducer.followings
      .filter((user) => user.status === "unfollowing")
      .map((user) => user.userId);

    console.log(data);

    fetch(`/api/users/${userId}/followings`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ followingIds: data }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};


export const follow = (userId, accessToken) => {
  return (getState) => {
    const state = getState();

    console.log(state);

    let data = state.userReducer.followings
      .filter((user) => user.status === "unfollowing")
      .map((user) => user.userId);

    console.log(data);

    fetch(`/api/users/${userId}/followings`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ followingIds: data }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};
