import React from 'react'

class VideoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    const { currentVideo } = this.props.youtubeReducer;
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{currentVideo.snippet.title}</h5>
          <p className="card-text">{currentVideo.snippet.description}</p>
        </div>
      </div>
    )
  }
}

export default VideoDetails;
