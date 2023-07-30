const initialState = {
	messages: [],
	people: [],
};

const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REFRESH':
			return action.payload;

		default:
			return state;
	}
};

export default chatReducer;
