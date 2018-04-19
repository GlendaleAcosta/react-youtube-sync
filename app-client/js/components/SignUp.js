import React from 'react'
import { Link } from 'react-router-dom';
import { signUp } from 'actions/userActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  render () {
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
              className="form-control"
              placeholder="Enter email" />
            </div>

          <div className="form-group">
            <label>Username</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
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
