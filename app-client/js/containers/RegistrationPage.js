import React from 'react'
import { connect } from 'react-redux';
import SignUp from 'components/SignUp';
import Login from 'components/Login';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderForm = () => {
    return (this.props.match.path === '/sign-up')
    ? <SignUp {...this.props} />
    : <Login {...this.props} />;
  }

  render () {
    return (
      <div className="card col-md-4">
        {this.renderForm()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  };
}

export default connect(mapStateToProps)(RegistrationPage);
