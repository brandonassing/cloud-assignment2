import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      username: ""
    }
  }

  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(resJson => {
        let loggedIn = false;
        let username = "";
        if (resJson.length !== 0) {
          resJson.forEach((user) => {
            if (user.loggedIn) {
              loggedIn = true;
              username = user.username
            }
          });
        }
        this.setState({
          isAuthenticated: loggedIn,
          username: username
        });
      });
  }

  loggedIn = (auth, username) => {
    this.setState({ 
      isAuthenticated: auth,
      username: username 
    })
  }

  // TODO bug: if logged in and refresh on / it redirects to /login and then back to /
  render() {
    const isAuthenticated = this.state.isAuthenticated

    return (
      <Router>
        <div>
          <Route exact path="/login" render={(props) => (
            !isAuthenticated ? (
              <Login {...props} loggedIn={this.loggedIn} />) 
              :
              <Redirect to="/" />)} />

          <Route exact path="/" render={(props) => (
            isAuthenticated ?
              <Home {...props} loggedIn={this.loggedIn} username={this.state.username} />
              :
              <Redirect to="/login" />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
