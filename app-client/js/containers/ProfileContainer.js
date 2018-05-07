import React from 'react'
import { connect } from 'react-redux';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props);
  }

  render () {
    const { user } = this.props.userReducer;
    return (
      <div className="container pt-3">
        <div className="row">

          <div className="col-md-12 mb-3">
            <h1 className="mt-3 mb-3">My Profile</h1>

            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">Settings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Following</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Followers</a>
              </li>
            </ul>


            <div className="card">
              <div className="card-body">
                 <label>Email address</label>
               <input disabled value={user.email} type="text" className="form-control mb-1"/>

                 <label>Username</label>
               <input disabled value={user.username} type="text" className="form-control mb-1"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  };
}

export default connect(mapStateToProps)(ProfileContainer);
