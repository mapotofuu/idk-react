import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
const axios = require('axios');

class App extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    this.setState({
      users: (await axios.get('https://jsonplaceholder.typicode.com/users')).data
    })
  }

  removeUser = (index) => {
    const {users} = this.state;

    this.setState({
      users: users.filter((name, i) => {
        return i !== index
      }),
    })
  }

  handleSubmit = (user) => {
    this.setState({
      users: [...this.state.users, user]
    })
  }

  render() {
    const { users } = this.state;

    return (
      <div className="container">
        <h1>Hi React, this is Morgan</h1>
        <Table userData={users} removeUser={this.removeUser} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App