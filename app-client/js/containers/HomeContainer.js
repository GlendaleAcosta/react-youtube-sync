import React from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from 'actions/roomActions';
import { openModal } from 'actions/modalActions';
import { Link } from 'react-router-dom';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.dispatch(fetchRooms());
  }

  createRoom = () => {
    this.props.dispatch(openModal('CreateRoomModal'))
  }

  renderCards = () => {
    const { rooms } = this.props.roomReducer;
    return !rooms ? null : (
      rooms.map((room, index) => {
        return (
          <div className="col-md-6 mb-3" key={room.id}>
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{room.title}</h4>
                <p className="card-text">Host: {room.host}</p>
                <Link className="btn btn-info" to={`/room/${room.id}`}>Join Room</Link>
              </div>
            </div>
          </div>
        )
      })
    );
  }

  render () {
    const { redirectToRoom, roomId, fetchingRooms } = this.props.roomReducer;
    if (redirectToRoom) {
      this.props.history.push(`room/${roomId}`);
    }
    return (
      <div className="container pt-3">
        <div className="row">

          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h1 className="card-title">Watch youtube with your friends!</h1>
                <p className="card-title">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <button
                  className="btn btn-primary align-self-end"
                  onClick={this.createRoom}
                >
                  Create Room
                </button>
              </div>
            </div>
          </div>

          <h2 className="col-md-12 mt-3">Rooms: </h2>
          {fetchingRooms ? null: this.renderCards()}

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    roomReducer: state.roomReducer,
  };
}

export default connect(mapStateToProps)(HomeContainer);
