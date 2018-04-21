import React from 'react'
import { Link } from 'react-router-dom';
import { signUp, clearValidationErrors } from 'actions/userActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.dispatch(clearValidationErrors(e.target.name));
  }


  signUp = (e) => {
    e.preventDefault();
    const { email, username, password } = this.state;
    const user = {
      email,
      username,
      password
    };
    this.props.dispatch(signUp(user));
  }

  componentWillUnmount() {
    this.props.dispatch(clearValidationErrors('CLEAR_ALL'));
  }

  render () {
    const { error } = this.props.userReducer;
    const invalidEmail = error.email ? 'is-invalid': null;
    const invalidUsername = error.username ? 'is-invalid': null;
    return (
      <div className="card-body">
        <h5 className="card-title">Sign Up</h5>
        <p>Already have an account? <Link to="/login">Login!</Link></p>
        <form onSubmit={this.signUp}>
          <div className="form-group">
            <label>Email address</label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              type="email"
              className={`form-control ${invalidEmail}`}
              placeholder="Enter email" />
            {invalidEmail ? <div className="invalid-feedback"> That email already exists. </div> : null}
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              className={`form-control ${invalidUsername}`}
              placeholder="Enter username"
            />
          {invalidUsername ? <div className="invalid-feedback"> That username already exists. </div> : null}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <div className="d-flex col-md-12 p-0 justify-content-end">
            <button type="submit" className="btn btn-info">Sign In</button>
          </div>

        </form>
      </div>
    )
  }
}

export default SignUp;
