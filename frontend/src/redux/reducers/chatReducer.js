const initialState = {
  messages: [],
  people: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REFRESH':
      return action.payload;

    case 'SEND':
      const newMessages = [...state.messages, action.payload];
      return { ...state, messages: newMessages };

    default:
      return state;
  }
};

export default chatReducer;
