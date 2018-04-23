import React from 'react'

class PlayerControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPlayBtn = () => {
    const { playerState, clientPlay, clientPause } = this.props;
    if (playerState === 2 || playerState === -1) {
      return <i onClick={clientPlay} className="material-icons">play_arrow</i>
    } else if (playerState === 1) {
      return <i onClick={clientPause} className="material-icons">pause</i>
    }
    return <i className="material-icons">play_arrow</i>
  }

  render () {
    return (
      <div className="player-control row">
        <div className="progress-bar"></div>
        <div className="play-btn d-flex justify-content-center align-items-center">
          {this.renderPlayBtn()}
        </div>
      </div>
    )
  }
}

export default PlayerControls;
