import React from 'react'
import { searchVideo, fetchCurrentVideo } from 'actions/YouTubeActions';
import { closeModal } from 'actions/modalActions';


class YouTubeSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  searchYouTubeVideo = (e) => {
    e.preventDefault();
    this.props.dispatch(searchVideo(this.state.search));
  }

  setVideo = (video) => {
    const {socket} = this.props.roomReducer;
    const newVideo = {
      id: video.id.videoId,
      snippet: video.snippet
    };
    this.props.dispatch(fetchCurrentVideo(newVideo));
    this.props.dispatch(closeModal());
    socket.emit('youtube_currentVideo', newVideo);
  }

  renderVideos = () => {
    const { videos } = this.props.youtubeReducer;
    console.log(videos);
    return videos.map((video) =>
      (
        <div className="row p-2 video-search-card">
          <div className="col-md-4">
            <img alt={video.snippet.title} src={video.snippet.thumbnails.medium.url} />
          </div>
          <div className="col-md-8">
            <p className="font-weight-bold">{video.snippet.title}</p>
            <p className="text-secondary font-weight-light">{video.snippet.channelTitle}</p>
            <p className="text-secondary font-weight-light">{video.snippet.description}</p>
          </div>
          <div className="col-md-12 d-flex justify-content-end mt-3">
            <button
              className="btn btn-primary mr-2"
            >
              Add to Queue
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.setVideo(video)}
            >
              Play now
            </button>
          </div>
        </div>
      )
    );
  }

  render () {

    return(
      <div className="container m-3 modal-card overflow-scroll">
        <div className="row oveflow-scroll">
          <div className="col-md-12 card">
            <div className="card-body">


              <form onSubmit={this.searchYouTubeVideo} className="form-inline my-2 my-lg-0">
                <input
                  onChange={this.handleChange}
                  value={this.state.q}
                  name="search"
                  className="form-control mr-sm-2 col-md-5"
                  type="search"
                  placeholder="Search youtube videos"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>

              <div className="row">
                <div className="col-md-12 pt-3">
                  <p>Showing Results for "Cute Samoyeds"</p>
                </div>

                <div className="col-md-12">
                  {this.renderVideos()}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }
}








export default YouTubeSearchModal;
