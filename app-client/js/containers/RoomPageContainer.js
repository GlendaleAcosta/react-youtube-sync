import React from 'react'
import YouTube from 'react-youtube';
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { openModal } from 'actions/modalActions';

class RoomPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('/', {query: {roomId: props.match.params.roomId}}),
      pausedFromServer: false,
      playedFromServer: false
    };
  }

  onReady = (video) => {
    var {socket} = this.state;
    const that = this;

    socket.on('youtube_playVideo', function(playTime){
      that.setState({
        playedFromServer: true
      });
      var currentTime = video.target.getCurrentTime();

      if (currentTime - playTime > 0.15 || playTime - currentTime < -0.15 ){
        video.target.seekTo(playTime, true);
        video.target.playVideo();
        setTimeout(() => {
          that.setState({
            playedFromServer: false
          });
        }, 1000);

      } else {
        video.target.playVideo();
        setTimeout(() => {
          that.setState({
            playedFromServer: false
          });
        }, 1000);
      }
    });

    socket.on('youtube_pauseVideo', function(pauseTime){
      that.setState({
        pausedFromServer: true
      });
      var currentTime = video.target.getCurrentTime();
      if (currentTime - pauseTime > 0.15 || pauseTime - currentTime < -0.15){
        video.target.seekTo(pauseTime, true);
        video.target.pauseVideo();
        setTimeout(() => {
          that.setState({
            pausedFromServer: false
          });
        }, 1000);
      } else {
        video.target.pauseVideo();
        setTimeout(() => {
          that.setState({
            pausedFromServer: false
          });
        }, 1000);
      }
    });
  };



  onPlay = (video) => {
    var {socket} = this.state;
    var time = video.target.getCurrentTime();
    if (!this.state.playedFromServer) {
      console.log('I PLAYED IT');
      socket.emit('youtube_onPlay', time);
    }
  }

  onPause = (video) => {
    var {socket} = this.state;
    var time = video.target.getCurrentTime();
    if (!this.state.pausedFromServer) {
      console.log('I PAUSED IT');
      socket.emit('youtube_onPause', time);
    }
  }

  addVideo = () => {
    this.props.dispatch(openModal('YouTubeSearchModal'));
  }

  render () {
    return (
      <div className="full-page row m-0">
        <div className="col-md-2 queue-bg">
          <div onClick={this.addVideo} className="big-ass-add-btn">

          </div>
        </div>
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <YouTube
            videoId="QtVL76gh09U"
            onPlay={this.onPlay}
            onPause={this.onPause}
            onReady={this.onReady}
          />
        </div>
        <div className="col-md-3 chat-bg">
          Chat
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  };
}

export default connect(mapStateToProps)(RoomPageContainer);
