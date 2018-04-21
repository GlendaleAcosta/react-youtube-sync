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

export function signUp(user) {
  return function (dispatch) {
    dispatch(fetchUser());
    return axios({
      method: 'POST',
      url: '/sign-up',
      data: user,
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(userFetched(response.data.user));
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
      if (response.data.token)
        localStorage.setItem('token', response.data.token);
      dispatch(userFetched(response.data.user));
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
