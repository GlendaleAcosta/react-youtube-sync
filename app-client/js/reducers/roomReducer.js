export default function reducer(state = {
  socket: null,
  redirectToRoom: false,
  roomId: null,
  fetchingRoom: false,
  roomExists: false,
  fetchingRooms: true,
  rooms: []
}, action) {
  switch (action.type) {
    case 'SET_SOCKET': {
      return {
        ...state,
        socket: action.payload,
      };
    }
    case 'REDIRECT_TO_NEW_ROOM': {
      return {
        ...state,
        roomId: action.payload,
        redirectToRoom: true
      }
    }
    case 'RESET_ROOM_REDIRECT': {
      return {
        ...state,
        roomId: null,
        redirectToRoom: false
      }
    }
    case 'FETCHING_ROOMS': {
      return {
        ...state,
        fetchingRooms: true
      }
    }
    case 'ROOMS_FETCHED': {
      console.log(action.payload);
      return {
        ...state,
        fetchingRooms: false,
        rooms: action.payload
      }
    }
    default: return state;
  }
}
