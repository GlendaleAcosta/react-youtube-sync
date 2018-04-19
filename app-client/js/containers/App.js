import React from 'react'
import NavbarContainer from 'containers/NavbarContainer';
import { Route, withRouter } from 'react-router-dom';
import RegistrationPage from 'containers/RegistrationPage';
import { login } from 'actions/userActions';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchInitialResources();
  }

  fetchInitialResources = () => {
    const token = localStorage.getItem('token') || null;
    if (token) {
      this.props.dispatch(login(null, token));
        // get messages
        // get notifications
    }
    // get popular rooms
  }

  renderApp = () => {
    // if loading user / messages / notifications / rooms ?
        // render loading screen
    // else
        // render App
  }

  render () {
    const { fetchingUser } = this.props.userReducer;
    return fetchingUser
      ? null
      : (
        <div>
          <NavbarContainer />
          <Route exact path="/sign-up" component={RegistrationPage}/>
          <Route exact path="/login" component={RegistrationPage}/>
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  };
}

export default withRouter(connect(mapStateToProps)(App));
