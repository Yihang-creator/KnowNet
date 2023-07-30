export const fetchChat = (userId1, userId2, accessToken) => {
	return (dispatch) => {
		fetch(`/api/chats/${userId1}/${userId2}`, {
			headers: {
				Authorization: 'Bearer ' + accessToken,
			},
		})
			.then((response) => {
				if (!response.ok) throw new Error('API call failed');
				return response.json();
			})
			.then((data) => {
				dispatch(refresh(data));
			})
			.catch((error) => {
				console.error('Error', error);
			});
	};
};

export const refresh = (data) => {
	return {
		type: 'REFRESH',
		payload: data,
	};
};

export const send = (userId1, userId2, text, accessToken) => {
	return () => {
		fetch(`/api/chats/${userId1}/${userId2}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify({ text: text }),
		})
			.then((response) => {
				if (!response.ok) throw new Error('API call failed');
				return response.json();
			})
			.catch((error) => {
				console.error('Error', error);
			});
	};
};
