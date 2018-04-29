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

export function initiateSocket(socket) {
  return {
    type: 'SET_SOCKET',
    payload: socket,
  };
}

export function createRoom() {
  return function (dispatch) {
    return axios({
      method: 'POST',
      url: '/room',
      data: null,
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
