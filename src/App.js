import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Registration from './views/Registration'
import Home from './views/Home'
import Admin from './views/Admin'
import Brackets from './views/Brackets'
import Login from './views/Login'
import Redirect from './views/Redirect'
import Auth from './components/Auth/Auth'
import history from './components/Auth/history'

const auth = new Auth()
class App extends Component {

  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      console.log('wtf goin on')
      console.log(nextState)
      auth.handleAuthentication();
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/register/:tournamentId" component={Registration} />
            <Route path="/bracket/:tournamentId" component={Brackets} />
            <Route path="/login" component={Login} />
            <Route path="/redirect"render={(props) => {
              this.handleAuthentication(props);
              return <Redirect {...props}/>
            }} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
