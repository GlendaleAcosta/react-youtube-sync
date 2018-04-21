export default function reducer(state = {
  modal: null
}, action) {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        modal: action.payload
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        modal: null
      }
    }
    default: return state;
  }
}
