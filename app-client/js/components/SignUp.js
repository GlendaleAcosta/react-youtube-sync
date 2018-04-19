import React from 'react'
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="card-body">
        <h5 className="card-title">Sign Up</h5>
        <p>Already have an account? <Link to="/login">Login!</Link></p>
        <form>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Username</label>
          <input type="text" className="form-control" placeholder="Enter username" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password"/>
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
