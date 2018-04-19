import React from 'react'
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e) => {
    e.preventDefault();
  }

  render () {
    return (
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <p>Don't have an account? <Link to="/sign-up">Sign Up!</Link></p>
        <form onSubmit={this.login}>

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
            <button type="submit" className="btn btn-info">Login</button>
          </div>

        </form>
      </div>
    )
  }
}

export default Login;
