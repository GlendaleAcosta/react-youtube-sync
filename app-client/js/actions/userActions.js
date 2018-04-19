import axios from 'axios';

function fetchUser() {
  return {
    type: 'FETCH_USER',
    payload: null,
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
      console.log(response);
      return {
        type: 'USER_FETCHED',
        payload: response.data.user,
      };
    })
    .catch((error) => {
      console.log(error)
      return {
        type: 'ERROR',
        payload: error,
      };
    });
  };
}

export function login(filter) {
  return axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${filter}`,
    params: {
      api_key: process.env.TMDB_KEY,
    },
  })
  .then((response) => {
    return {
      type: 'GET_MOVIES',
      payload: response.data,
    };
  })
  .catch((error) => {
    console.log(error);
    return {
      type: 'ERROR',
      payload: error,
    };
  });
}
