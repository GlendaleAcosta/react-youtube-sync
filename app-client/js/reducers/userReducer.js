export default function reducer(state = {
  user: null,
  fetchingUser: false,
  userFetched: false,
  error: {
    email: null,
    username: null,
    message: null
  },
  initialUserResourcesFetched: false,
}, action) {
  switch (action.type) {
    case 'FETCH_USER': {
      return {
        ...state,
        fetchingUser: true,
      };
    }
    case 'USER_FETCHED': {
      return {
        ...state,
        fetchingUser: false,
        userFetched: true,
        error: {
          email: null,
          username: null,
          message: null
        },
        user: action.payload,
        initialUserResourcesFetched: (!state.initialUserResourcesFetched)
          ? true
          : state.initialUserResourcesFetched
      }
    }
    case 'ERROR': {
      return {
        ...state,
        fetchingUser: false,
        userFetched: false,
        error: action.payload
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        userFetched: null,
        fetchingUser: null,
        error: {
          email: null,
          username: null,
          message: null
        },
      }
    }
    case 'INITIAL_RESOURCES_FETCHED': {
      return {
        ...state,
        initialUserResourcesFetched: true
      }
    }
    case 'CLEAR_VALIDATION_ERRORS': {
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload]: null
        }
      }
    }
    default: return state;
  }
}
