import React from 'react'
import { Link } from 'react-router-dom';
import { login, clearValidationErrors } from 'actions/userActions';

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
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    this.props.dispatch(login(user));
  }

  componentWillUnmount() {
    this.props.dispatch(clearValidationErrors('CLEAR_ALL'));
  }

  render () {
    const { error } = this.props.userReducer;
    const invalidEmail = error.email ? 'is-invalid': null;
    // const invalidUsername = error.username ? 'is-invalid': null;
    const invalidMsg = error.message ? 'is-invalid': null;
    console.log(error.message)
    console.log(error);
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
              className={`form-control ${invalidMsg}`}
              placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              type="password"
              className={`form-control ${invalidMsg}`}
              placeholder="Password"
            />

            {(error.message) ? <div className="invalid-feedback">{error.message}</div> : null}
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
