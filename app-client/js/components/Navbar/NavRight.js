import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from 'actions/userActions';

class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  logout = (e) => {
    e.preventDefault();
    this.props.dispatch(logout());
    this.setState({showMenu: false});
  }

  renderNav = () => {
    const { user } = this.props.userReducer;
    if (user)
      return (
        <ul className="navbar-nav dropdown">
          <li className="nav-item">
            <a
              onClick={() => this.setState({showMenu: !this.state.showMenu})}
              className="nav-link dropdown-toggle btn"
            >
              {user.email}
            </a>
          </li>
          {
          this.state.showMenu ?
          <div className="dropdown-menu show">
            <Link className="dropdown-item" to={`/profile/${user.id}`}>View Profile</Link>
            <a href="/"onClick={this.logout} className="dropdown-item">Logout</a>
          </div>
          : null
          }
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
