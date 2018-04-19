export default function reducer(state = {
  user: null,
  fetchingUser: false,
  userFetched: false,
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
        userFetched: true,
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
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        userFetched: null,
        fetchingUser: null,
        error: null
      }
    }
    default: return state;
  }
}
