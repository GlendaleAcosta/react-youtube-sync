import React from 'react';
import { connect } from 'react-redux';
import { createRoom } from 'actions/roomActions';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createRoom = () => {
    this.props.dispatch(createRoom());

  }

  render () {
    const { redirectToRoom, roomId } = this.props.roomReducer;
    if (redirectToRoom) {
      this.props.history.push(`room/${roomId}`);
    }
    return (
      <button
        className="btn btn-primary"
        onClick={this.createRoom}
      >
        Create Room
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
    roomReducer: state.roomReducer,
  };
}

export default connect(mapStateToProps)(HomeContainer);
