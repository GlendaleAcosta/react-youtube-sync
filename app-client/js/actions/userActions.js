import axios from 'axios';

function userFetched(user) {
  return {
    type: 'USER_FETCHED',
    payload: user,
  };
}

function errorFetchingUser(error) {
  return {
    type: 'ERROR',
    payload: error,
  };
}

function fetchUser(token) {
  return {
    type: 'FETCH_USER',
    payload: null,
  };
}

export function initalUserFetched() {
  return {
    type: 'INITIAL_RESOURCES_FETCHED',
    payload: null
  };
}

export function clearValidationErrors(name) {
  if (name === 'CLEAR_ALL') {
    return {
      type: 'CLEAR_VALIDATION_ERRORS',
      payload: {
        email: null,
        username: null,
        message: null
      }
    };
  } else {
    return {
      type: 'CLEAR_VALIDATION_ERRORS',
      payload: name
    };
  }
}

export function signUp(user) {
  return function (dispatch) {
    dispatch(fetchUser());
    return axios({
      method: 'POST',
      url: '/sign-up',
      data: user,
    })
    .then((response) => {
      console.log(response.data.error);
      if (response.data.error) {
        dispatch(errorFetchingUser(response.data.error));
      } else {
        localStorage.setItem('token', response.data.token);
        dispatch(userFetched(response.data.user));
      }
    })
    .catch((error) => {
      dispatch(errorFetchingUser(error));
    });
  };
}

export function login(user, token) {
  return function (dispatch) {
    dispatch(fetchUser());
    return axios({
      method: 'POST',
      url: '/login',
      data: {
        user,
        token
      },
    })
    .then((response) => {
      console.log(response);
      if (response.data.error) {
        dispatch(errorFetchingUser(response.data.error));
      } else if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        dispatch(userFetched(response.data.user));
      } else {
        dispatch(userFetched(response.data.user));
      }
    })
    .catch((error) => {
      dispatch(errorFetchingUser(error));
    });
  };
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: 'LOGOUT',
    payload: null
  }
}
