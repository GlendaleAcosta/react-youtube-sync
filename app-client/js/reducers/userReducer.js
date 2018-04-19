export default function reducer(state = {
  user: null,
  fetchingUser: false,
  error: false,
}, action) {
  switch (action.type) {
    case 'FETCH_USER': {
      return {
        ...state,
        fetchingUser: true,
        error: false
      };
    }
    case 'USER_FETCHED': {
      return {
        ...state,
        fetchingUser: false,
        error: false,
        user: action.payload
      }
    }
    case 'ERROR': {
      return {
        ...state,
        error: action.payload
      }
    }
    default: return state;
  }
}
