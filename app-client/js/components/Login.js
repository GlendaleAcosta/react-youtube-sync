import React from 'react'
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <p>Don't have an account? <Link to="/sign-up">Sign Up!</Link></p>
        <form>
          <div className="form-group">
            <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
          <input type="password" className="form-control" placeholder="Password"/>
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
