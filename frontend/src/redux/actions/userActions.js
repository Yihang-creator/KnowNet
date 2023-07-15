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

export const follow = (myId, userId, operation, type, accessToken) => {
  return (dispatch) => {
    fetch(`/api/users/${myId}/${operation}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then(dispatch(toggleFollowingAndFollowers(userId, type)))
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};
