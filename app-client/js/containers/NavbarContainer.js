import React from 'react'
import { Link } from 'react-router-dom';
import NavRight from 'components/Navbar/NavRight';
import { connect } from 'react-redux';

class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Youtube-Sync</Link>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Browse Rooms <span className="sr-only">(current)</span></Link>
            </li>
          </ul>
          <NavRight {...this.props} />
        </div>
      </nav>

    )
  }
}

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  };
}

export default connect(mapStateToProps)(NavbarContainer);
