import React from 'react'

class YouTubeSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-10 modal-card">
            <div className="card">
              Search
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default YouTubeSearchModal;
