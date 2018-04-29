import React from 'react'
import YouTubeSearchModal from 'components/Modals/YouTubeSearchModal';
import CreateRoomModal from 'components/Modals/CreateRoomModal';
import { closeModal } from 'actions/modalActions';
import { connect } from 'react-redux';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    this.props.dispatch(closeModal());
  }

  render () {
    const { modal } = this.props.modalReducer;
    return (
      <div className="modal-container d-flex justify-content-center overflow-hidden">
        { (modal === 'YouTubeSearchModal') ? <YouTubeSearchModal {...this.props} /> : null }
        { (modal === 'CreateRoomModal') ? <CreateRoomModal {...this.props} /> : null }

        <div onClick={this.closeModal} className="modal-dark-bg" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modalReducer: state.modalReducer,
    youtubeReducer: state.youtubeReducer,
    roomReducer: state.roomReducer,
    userReducer: state.userReducer
  };
}

export default connect(mapStateToProps)(ModalContainer);
