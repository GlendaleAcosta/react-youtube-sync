export default function reducer(state = {
  socket: null
}, action) {
  switch (action.type) {
    case 'SET_SOCKET': {
      return {
        ...state,
        socket: action.payload,
      };
    }
    default: return state;
  }
}
