import React from 'react'

class ChatSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatText: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendMessage = () => {
    const { socket } = this.props.roomReducer;
    const { user } = this.props.userReducer;
    const username = user ? user.username : localStorage.getItem('GuestName');
    const chatLine = {
      username,
      message: this.state.chatText
    };
    socket.emit('chat message', chatLine);
    this.setState({
      chatText: '',
    });
  }

  renderChat = () => {
    const { chatMessages } = this.props.chatReducer;
    return chatMessages.map((chatLine) => {
      return (
        <p className="small mb-0">
          <span className="font-weight-bold">{chatLine.username}</span>: {chatLine.message}
        </p>
      )
    });
  }

  render () {
    return (
      <div className="col-md-3 chat-bg d-flex flex-column">
        <div className="col-md-12 pr-1 pl-1 pt-1 chat">
          <div className="col-md-12 p-0" style={{wordWrap: 'break-word'}}>
            {this.renderChat()}
          </div>
        </div>

        <textarea
          placeholder="Enter message..."
          name="chatText"
          id="chat-textarea"
          cols="30"
          rows="10"
          value={this.state.chatText}
          onChange={this.handleChange}
        />
        <button
          id="chat-btn"
          className="btn btn-primary"
          onClick={this.sendMessage}
        >
          Send Message
        </button>
      </div>
    );
  }
}

export default ChatSidebar;
