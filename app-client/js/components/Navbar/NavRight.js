import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from 'actions/userActions';

class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = (e) => {
    e.preventDefault();
    this.props.dispatch(logout());
  }

  renderNav = () => {
    const { user } = this.props.userReducer;
    if (user)
      return (
        <ul className="navbar-nav dropdown">
          <li className="nav-item">
            <Link className="nav-link dropdown-toggle" to="/profile">gglendale17@gmail.com</Link>
          </li>
          <div className="dropdown-menu show">
            <Link className="dropdown-item" to={`/profile/${user.id}`}>View Profile</Link>
            <Link className="dropdown-item" to="/">Settings</Link>
            <a href="/"onClick={this.logout} className="dropdown-item">Logout</a>
          </div>
        </ul>
      )
    else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/sign-up">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      )
    }
  }

  render () {
    return this.renderNav();
  }
}

export default NavRight;
