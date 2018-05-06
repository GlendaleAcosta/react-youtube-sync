import React from 'react'
import { createRoom } from 'actions/roomActions';
import { closeModal } from 'actions/modalActions';

class CreateRoomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomTitle: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  createRoom = (e) => {
    e.preventDefault();
    const { roomTitle } = this.state;
    const { user } = this.props.userReducer;
    const username = user ? user.username : localStorage.getItem('GuestName');
    this.props.dispatch(createRoom(roomTitle, username));
    this.props.dispatch(closeModal());
  }

  render () {
    const { user } = this.props.userReducer;
    const guestName = localStorage.getItem('GuestName');
    return (

      <div className="card modal-card align-self-center col-md-4">
        <div className="card-body">
          <h3 className="card-title">Create Room</h3>
          <form onSubmit={this.createRoom}>
            <div className="form-group">
              <label for="exampleInputEmail1">Enter Room Title (example: "Watching music videos!")</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                name="roomTitle"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Host</label>
            <input
              type="text"
              disabled
              className="form-control"
              placeholder={user ? user.username : guestName}
            />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>
      </div>
    )
  }
}

export default CreateRoomModal;
