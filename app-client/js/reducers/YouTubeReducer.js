export default function reducer(state = {
  videos: [],
  fetchingVideos: false,
  fetchingCurrentVideo: false,
  currentVideo: 'QhBnZ6NPOY0',
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
    case 'FETCH_CURRENT_VIDEO': {
      return {
        ...state,
        fetchingCurrentVideo: true,
        currentVideo: action.payload
      }
    }
    default: return state;
  }
}
