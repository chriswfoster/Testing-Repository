import React, { Component } from 'react';
import Router from './router';

import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: { id: 1 }
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    // axios.get('/api/questions').then(response=> console.log(response.data));
    // axios
    //   .get(`/api/users/${this.state.user.id}`)
    //   .then(response => console.log(response.data));
  }

  handleLogin() {
    window.location.href = 'http://localhost:3001/login';
  }

  render() {
    return (
      <div className="App">
        {Router}
        <hr />
        <h1>Q2</h1>
        
        <button onClick={() => this.handleLogin()}>TEST AUTH0</button>
      </div>
    );
  }
}

export default App;
