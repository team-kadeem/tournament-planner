import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Registration from './views/Registration'
import Home from './views/Home'
import Admin from './views/Admin'
import Brackets from './views/Brackets'


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/register/:tournamentId" component={Registration} />
            <Route path="/bracket/:tournamentId" component={Brackets} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
