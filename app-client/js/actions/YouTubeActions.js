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


export function fetchCurrentVideo(roomId) {
    // dispatch(fetchVideos());
    return axios({
      method: 'POST',
      url: '/api/current-video',
      data: { roomId }
    })
    .then((response) => {
      console.log(response);
      return {
        type: 'CURRENT_VIDEO_FETCHED',
        payload: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      // dispatch(errorFetchingUser(error));
    });
}

export function changeCurrentVideo(video, roomId) {
    return axios({
      method: 'PUT',
      url: '/api/current-video',
      data: {
        video,
        roomId
      }
    })
    .then((response) => {
      console.log(video);
      return {
        type: 'CHANGE_CURRENT_VIDEO',
        payload: video
      }
    })
    .catch((error) => {
      console.log(error);
    })
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
