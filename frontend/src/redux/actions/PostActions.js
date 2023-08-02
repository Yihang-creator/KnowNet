export const fetchPost = (postId, accessToken) => {
  return (dispatch) => {
    fetch(`/api/posts/${postId}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('API call failed');
        return response.json();
      })
      .then((data) => {
        dispatch(setPost(data));
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };
};

export const fetchAllPost = (accessToken) => {
  return (dispatch) => {
    fetch(`/api/posts/`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('API call failed');
        return response.json();
      })
      .then((data) => {
        dispatch(setAllPost(data));
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };
};
export const setPost = (post) => {
  return {
    type: 'SET_POST',
    payload: post,
  };
};
export const setAllPost = (posts) => {
  return {
    type: 'SET_ALL_POSTS',
    payload: posts,
  };
};
export const deletePostReduxStore = (postId) => {
  return {
    type: 'DELETE_POST',
    payload: postId,
  };
};

export const deletePost = (postId, accessToken) => {
  return (dispatch) => {
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('API call failed');
        return response;
      })
      .then((response) => {
        dispatch(deletePostReduxStore(postId));
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };
};

export const loadMorePosts = (accessToken, page, limit) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/posts/?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error('API call failed');
          return response.json();
        })
        .then((data) => {
          dispatch(appendMorePosts(data));
          resolve(data.length);  // resolve with the number of posts fetched
        })
        .catch((error) => {
          console.error('Error', error);
          reject(error);  // reject with the error
        });
    });
  };
};

export const appendMorePosts = (posts) => {
  return {
    type: 'APPEND_MORE_POSTS',
    payload: posts,
  };
};
