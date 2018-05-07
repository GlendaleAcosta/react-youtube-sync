import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { openModal } from 'actions/modalActions';
import { initiateSocket, validateRoomPage, resetRoomState } from 'actions/roomActions';
import { changeCurrentVideo, fetchCurrentVideo } from 'actions/YouTubeActions';
import YouTube from 'react-youtube';
import PlayerControls from 'components/RoomPage/PlayerControls';
import QueueSidebar from 'components/RoomPage/QueueSidebar';
import VideoDetails from 'components/RoomPage/VideoDetails';
import { Redirect } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ChatSidebar from 'components/RoomPage/ChatSidebar';
import { addMessageToChat } from 'actions/chatActions';

class RoomPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yt: null,
      playerState: -1,
      currentTimeSet: false,
      copied: false,
      value: `http://localhost:3000/room/${props.match.params.roomId}`
    }
    props.dispatch(validateRoomPage(props.match.params.roomId));
    props.dispatch(initiateSocket(
      io('/', {query: {roomId: props.match.params.roomId}}),
    ));
    props.dispatch(fetchCurrentVideo(props.match.params.roomId));
  }

  onReady = (video) => {
    const that = this;

    this.setState({ yt: video });
    const { socket } = this.props.roomReducer;

    socket.on('chat', function(chatLine) {
      that.props.dispatch(addMessageToChat(chatLine));
    });

    socket.on('youtube_playVideo', function(playTime){
      video.target.seekTo(playTime);
      video.target.playVideo();
    });
    socket.on('youtube_pauseVideo', function(pauseTime){
      video.target.seekTo(pauseTime);
      video.target.pauseVideo();
    });
    socket.on('current_video', function(video){
      that.props.dispatch(changeCurrentVideo(video))
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
    // move the player
  }

  onPause = () => {
    // stop the player
  }

  onStateChange = (video) => {
    this.setState({
      playerState: video.target.getPlayerState()
    })
  }

  addVideo = () => {
    this.props.dispatch(openModal('YouTubeSearchModal'));
  }

  componentWillUnmount() {
    this.props.dispatch(resetRoomState());
  }

  handleCopy = () => {
    this.setState({copied: true})
    const that = this;
    setTimeout(() => {
      that.setState({copied: false})
    }, 1000)
  }

  render () {
    const { currentVideo } = this.props.youtubeReducer;
    const { validatingRoomPage, roomExists, currentRoom } = this.props.roomReducer;
    const { playerState } = this.state;
    if (validatingRoomPage) {
      return null;
    } else if (!validatingRoomPage && !roomExists) {
      return <Redirect to='/' />
    }
    return currentVideo ? (
      <div className="full-page row m-0">
        <QueueSidebar {...this.props} />
        <div className="col-md-7 overflow-scroll">
            <div className="card mt-2 mb-2">
              <div className="card-body">
                <h5 className="card-title">{currentRoom.title}</h5>
                <p className="card-text">Host: {currentRoom.host}</p>
              </div>
              <div className="card-footer text-muted d-flex justify-content-end">
                <CopyToClipboard text={this.state.value}
                  onCopy={this.handleCopy}>
                  <span className="btn btn-info">
                    {this.state.copied ? 'Copied to clipboard!' :' Copy Url and share with your friends!'}
                  </span>
                </CopyToClipboard>
              </div>
            </div>

            <YouTube
              id="youtube-iframe"
              containerClassName="youtube-container"
              videoId={currentVideo.id}
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
            <VideoDetails {...this.props} />
          </div>

        <ChatSidebar {...this.props} />


      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    youtubeReducer: state.youtubeReducer,
    roomReducer: state.roomReducer,
    chatReducer: state.chatReducer
  };
}

export default connect(mapStateToProps)(RoomPageContainer);
