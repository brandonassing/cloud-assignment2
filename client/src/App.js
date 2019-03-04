import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';

class App extends Component {
  constructor(props){
    super(props)

    this.state={
      isAuthenticated: false
    }
  }

  loggedIn = (auth) => {
    this.setState({isAuthenticated: auth})
  }
  
  render() {

    console.log(this.state)

    const isAuthenticated=this.state.isAuthenticated 

    return (
      <Router>
        <div>
          <Route exact path="/login" render={(props) => <Login {...props} loggedIn={this.loggedIn}/>} />
          <Route exact path="/" render={(props) => (
            isAuthenticated ? (
          <Home {...props} loggedIn={this.loggedIn}/>):
            <Redirect to="/login"/>)}/>
        </div>
      </Router>
    );
  }
}

export default App;
