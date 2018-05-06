export default function reducer(state = {
  chatMessages: []
}, action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload]
      };
    }

    default: return state;
  }
}
