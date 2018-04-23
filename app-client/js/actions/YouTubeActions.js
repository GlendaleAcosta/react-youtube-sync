import axios from 'axios';

function fetchVideos() {
  return {
    type: 'FETCH_VIDEOS',
    payload: null,
  };
}

function videosFetched(videos) {
  return {
    type: 'VIDEOS_FETCHED',
    payload: videos,
  };
}

export function fetchCurrentVideo(videoId) {
  return {
    type: 'FETCH_CURRENT_VIDEO',
    payload: videoId,
  };
}

export function searchVideo(q) {
  return function (dispatch) {
    dispatch(fetchVideos());
    return axios({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        maxResults: 20,
        part: 'snippet',
        type: 'video',
        q: q,
        key: 'AIzaSyCCw7UEn1SI4ITfARHB-B5Av-H3fxIx77o'
      }
    })
    .then((response) => {
      console.log(response);
      const videos = response.data.items;
      dispatch(videosFetched(videos));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(errorFetchingUser(error));
    });
  };
}
