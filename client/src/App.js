import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
