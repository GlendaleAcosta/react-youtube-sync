import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { openModal } from 'actions/modalActions';
import { initiateSocket } from 'actions/roomActions';
import YouTube from 'react-youtube';
import PlayerControls from 'components/RoomPage/PlayerControls';
import QueueSidebar from 'components/RoomPage/QueueSidebar';

class RoomPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yt: null,
      playerState: -1,
    }
    props.dispatch(initiateSocket(
      io('/', {query: {roomId: props.match.params.roomId}}),
    ));
  }

  onReady = (video) => {
    this.setState({ yt: video });
    const { socket } = this.props.roomReducer;
    socket.on('youtube_playVideo', function(playTime){
      video.target.playVideo();
    });
    socket.on('youtube_pauseVideo', function(pauseTime){
      video.target.pauseVideo();
    });
  }

  clientPlay = () => {
    const { yt } = this.state;
    const { socket } = this.props.roomReducer;
    yt.target.playVideo();
    socket.emit('youtube_onPlay', yt.target.getCurrentTime());
  }

  clientPause = () => {
    const { yt } = this.state;
    const { socket } = this.props.roomReducer;
    yt.target.pauseVideo();
    socket.emit('youtube_onPause', yt.target.getCurrentTime());
  }

  onPlay = () => {
    console.log('now playing')
  }

  onPause = () => {
    console.log('now paused')
  }

  onStateChange = (video) => {
    console.log(`state changed: ${video.target.getPlayerState()}`);
    this.setState({
      playerState: video.target.getPlayerState()
    })
  }

  addVideo = () => {
    this.props.dispatch(openModal('YouTubeSearchModal'));
  }

  render () {
    const { currentVideo } = this.props.youtubeReducer;
    const { playerState } = this.state;
    return (
      <div className="full-page row m-0">
        <QueueSidebar {...this.props} />
        <div className="col-md-7 overflow-scroll">
            <div className="card mt-2 mb-2">
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer text-muted">
                2 days ago
              </div>
            </div>

            <YouTube
              id="youtube-iframe"
              containerClassName="youtube-container"
              videoId={currentVideo}
              onReady={this.onReady}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onStateChange={this.onStateChange}
              opts={{
                width: '100%',
                playerVars: {
                  controls: 0, // player controls are disabled
                  disablekb: 1, // keyboard controls are disabled
                  rel: 0,
                }
              }}
            />
            <PlayerControls
              {...this.props}
              clientPlay={this.clientPlay}
              clientPause={this.clientPause}
              playerState={playerState}
            />
            <div className="test-box"></div>
            <div className="test-box"></div>
            <div className="test-box"></div>
          </div>

        <div className="col-md-3 chat-bg">
          
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    youtubeReducer: state.youtubeReducer,
    roomReducer: state.roomReducer
  };
}

export default connect(mapStateToProps)(RoomPageContainer);
