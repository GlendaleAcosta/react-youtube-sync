export default function reducer(state = {
  user: null,
  fetchingUser: false,
  userFetched: false,
  error: false,
  initialUserResourcesFetched: false,
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
        user: action.payload,
        initialUserResourcesFetched: (!state.initialUserResourcesFetched)
          ? true
          : state.initialUserResourcesFetched
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
    case 'INITIAL_RESOURCES_FETCHED': {
      return {
        ...state,
        initialUserResourcesFetched: true
      }
    }
    default: return state;
  }
}
