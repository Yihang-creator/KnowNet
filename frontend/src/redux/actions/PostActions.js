export const fetchPost = (postId, accessToken) => {
    console.log(accessToken);
    return (dispatch) => {
      fetch(`/posts/${postId}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
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

export const setPost = (post) => {
    return {
      type: 'SET_POST',
      payload: post,
    };
  };