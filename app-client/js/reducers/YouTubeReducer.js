export default function reducer(state = {
  videos: [],
  fetchingVideos: false,
}, action) {
  switch (action.type) {
    case 'FETCH_VIDEOS': {
      return {
        ...state,
        fetchingVideos: true,
      };
    }
    case 'VIDEOS_FETCHED': {
      return {
        ...state,
        fetchingVideos: false,
        videos: action.payload
      }
    }
    default: return state;
  }
}
