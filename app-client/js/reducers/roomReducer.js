export default function reducer(state = {
  socket: null,
  redirectToRoom: false,
  roomId: null,
  validatingRoomPage: true,
  roomExists: false,
  fetchingRooms: true,
  rooms: [],
  currentRoom: null,
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
      return {
        ...state,
        fetchingRooms: false,
        rooms: action.payload
      }
    }
    case 'VALIDATING_ROOM': {
      return {
        ...state,
        validatingRoomPage: true
      }
    }
    case 'ROOM_PAGE_VALIDATED': {
      return {
        ...state,
        validatingRoomPage: false,
        roomExists: true,
        currentRoom: action.payload
      }
    }
    case 'ROOM_INVALID': {
      return {
        ...state,
        validatingRoomPage: false,
        roomExists: false
      }
    }
    case 'RESET_ROOM_STATE': {
      return {
        ...state,
        redirectToRoom: false,
        roomId: null,
        validatingRoomPage: true,
        roomExists: false,
        fetchingRooms: true,
        currentRoom: null,
        socket: null
      }
    }
    default: return state;
  }
}
