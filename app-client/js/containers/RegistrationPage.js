import React from 'react'
import SignUp from 'components/SignUp';
import Login from 'components/Login';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderForm = () => {
    return (this.props.match.path === '/sign-up')
    ? <SignUp />
    : <Login />;
  }

  render () {
    return (
      <div className="card col-md-4">
        {this.renderForm()}
      </div>
    )
  }
}

export default RegistrationPage;
