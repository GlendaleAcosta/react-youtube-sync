import React from 'react'
import { openModal } from 'actions/modalActions';
import QueueVid from 'components/RoomPage/QueueVid';

class QueueSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addVideo = () => {
    this.props.dispatch(openModal('YouTubeSearchModal'));
  }

  render () {
    return (
      <div className="col-md-2 queue-bg d-flex flex-column">
        <div onClick={this.addVideo} className="big-ass-add-btn d-flex justify-content-center align-items-center">
          <i className="material-icons">add</i>
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active">History</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Queue</a>
          </li>
        </ul>
        <div className="queue-videos">
          <QueueVid {...this.props} />
          <QueueVid {...this.props} />
          <QueueVid {...this.props} />
          <QueueVid {...this.props} />
          <QueueVid {...this.props} />
          <QueueVid {...this.props} />
          <QueueVid {...this.props} />
        </div>
      </div>
    )
  }
}

export default QueueSidebar;
