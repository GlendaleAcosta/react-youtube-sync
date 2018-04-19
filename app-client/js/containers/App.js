import React from 'react'
import NavbarContainer from 'containers/NavbarContainer';
import { Route, withRouter, Redirect } from 'react-router-dom';
import RegistrationPage from 'containers/RegistrationPage';
import { login } from 'actions/userActions';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log(props.match);
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

  isLoggedIn = () => {
    const { user, userFetched } = this.props.userReducer;
    return (localStorage.getItem('token') && user && userFetched);
  }

  renderApp = () => {
    // if loading user / messages / notifications / rooms ?
        // render loading screen
    // else
        // render App
  }

  renderRegistrationPage = (props) => {
    return this.isLoggedIn()
      ? <Redirect to="/" />
      : <RegistrationPage {...props} />
  }

  renderProfilePage = (props) => {
    const { user } = this.props.userReducer;
    if (!this.isLoggedIn())
      return <Redirect to="/" />
    else if (user){
      if (parseInt(props.match.params.id, 10) === this.props.userReducer.user.id)
        return <h1>We good</h1>
      else
        return <Redirect to="/" />
    }
    return null;
  }

  render () {
    const { fetchingUser } = this.props.userReducer;
    return fetchingUser
      ? null
      : (
        <div>
          <NavbarContainer />
          <Route exact path="/sign-up" render={this.renderRegistrationPage} />
          <Route exact path="/login" render={this.renderRegistrationPage} />
          <Route exact path="/profile/:id" render={this.renderProfilePage} />
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
