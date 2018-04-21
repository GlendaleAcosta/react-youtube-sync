import React from 'react'
import NavbarContainer from 'containers/NavbarContainer';
import { Route, withRouter, Redirect } from 'react-router-dom';
import RegistrationPage from 'containers/RegistrationPage';
import { login, initalUserFetched } from 'actions/userActions';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const token = localStorage.getItem('token') || null;
    if (token) {
      this.props.dispatch(login(null, token));
        // get messages
        // get notifications
    } else {
      this.props.dispatch(initalUserFetched());
    }
    // get rooms
  }

  isLoggedIn = () => {
    const { user, userFetched } = this.props.userReducer;
    return (localStorage.getItem('token') && user && userFetched);
  }

  renderRegistrationPage = (props) => {
    return this.isLoggedIn()
      ? <Redirect to="/" />
      : <RegistrationPage {...props} />
  }

  renderProfilePage = (props) => {
    const { user } = this.props.userReducer;
    if (this.isLoggedIn() === null) {
        return <Redirect to="/" />
    }
    else if (user){
      if (parseInt(props.match.params.id, 10) === this.props.userReducer.user.id)
        return <h1>We good</h1>
      else
        return <Redirect to="/" />
    }
    return null;
  }

  render () {
    const { initialUserResourcesFetched } = this.props.userReducer;
    return (initialUserResourcesFetched)
      ? (
        <div>
            <NavbarContainer />
            <Route exact path="/sign-up" render={this.renderRegistrationPage} />
            <Route exact path="/login" render={this.renderRegistrationPage} />
            <Route exact path="/profile/:id" render={this.renderProfilePage} />
        </div>
      )
      : null
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  };
}

export default withRouter(connect(mapStateToProps)(App));
