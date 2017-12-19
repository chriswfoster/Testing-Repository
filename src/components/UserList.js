import React, { Component } from 'react';
import axios from 'axios';
import './UserList.css';

class UserList extends Component {
  constructor() {
    super();

    this.state = {
      userList: []
    };
  }

  //CWM get ALL active users
  componentWillMount() {
    axios.get('/api/users').then(response => {
      this.setState({ userList: response.data });
    });
  }

  render() {
    const users = this.state.userList.map((user, index) => {
      return (
        <div className="user-card" key={index}>
          <div className="user-card-left">
            <div className="user-avatar" />
          </div>

          <div className="user-card-right">
            <p>{user.name}</p>
          </div>
        </div>
      );
    });
    return <div className="userlist-main-container">{users}</div>;
  }
}

export default UserList;
