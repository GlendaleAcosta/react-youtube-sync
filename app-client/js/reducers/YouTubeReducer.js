export default function reducer(state = {
  videos: [],
  fetchingVideos: false,
  fetchingCurrentVideo: false,
  currentVideo: {
    id: 'QhBnZ6NPOY0',
    snippet: {
      description: 'sasuke is attempting to destroy the hidden leaf village but naruto refuses to let that happen! (instagram: @kingvader) follow me for more videos! WHAT TEAM ARE YOU! TEAM NARUTO OR SASUKE!?...',
      title: '"HOOD NARUTO" pt.3 (full video) naruto vs sasuke'
    }
  },
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
    case 'CHANGE_CURRENT_VIDEO': {
      return {
        ...state,
        currentVideo: action.payload
      }
    }
    default: return state;
  }
}
