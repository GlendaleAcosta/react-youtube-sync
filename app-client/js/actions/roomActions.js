import axios from 'axios';

function resetRoomRedirect() {
  return {
    type: 'RESET_ROOM_REDIRECT',
    payload: null
  }
}

function setRoomUrl(roomId) {
  return {
    type: 'REDIRECT_TO_NEW_ROOM',
    payload: roomId
  }
}

function goToNewlyCreatedRoom(roomId) {
  return function (dispatch) {
    dispatch(setRoomUrl(roomId));
    dispatch(resetRoomRedirect());
  }
}

function fetchingRooms() {
  return {
    type: 'FETCHING_ROOMS',
    payload: null
  }
}

function roomsFetched(rooms) {
  return {
    type: 'ROOMS_FETCHED',
    payload: rooms,
  }
}

export function initiateSocket(socket) {
  return {
    type: 'SET_SOCKET',
    payload: socket,
  };
}

export function createRoom(roomTitle, username) {
  return function (dispatch) {
    return axios({
      method: 'POST',
      url: '/room',
      data: {
        roomTitle,
        username
      }
    })
    .then((response) => {
      console.log(response);
      if (response.data.roomId)
        dispatch(goToNewlyCreatedRoom(response.data.roomId));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(errorFetchingUser(error));
    });
  };
}

export function fetchRooms() {
  return function (dispatch) {
    // dispatch(fetchingRooms());
    return axios({
      method: 'POST',
      url: 'api/room-list',
      data: null
    })
    .then((response) => {
      console.log(response);
      dispatch(roomsFetched(response.data.rooms));
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
