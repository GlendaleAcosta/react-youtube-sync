import React from 'react'
import NavbarContainer from 'containers/NavbarContainer';
import { Route } from 'react-router-dom';
import RegistrationPage from 'containers/RegistrationPage';

class App extends React.Component {
  render () {
    return (
      <div>
        <NavbarContainer />
        <Route exact path="/sign-up" component={RegistrationPage}/>
        <Route exact path="/login" component={RegistrationPage}/>
      </div>
    )
  }
}

export default App;
