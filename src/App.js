import React, { Component } from 'react';
import Table from './Table';

class App extends Component {
  render() {
    const names = [
      {
        firstname: 'mickey',
        lastname: 'mouse',
      },
      {
        firstname: 'donald',
        lastname: 'duck',
      },
      {
        firstname: 'goofy',
        lastname: 'idontknowhislastname',
      },
    ];

    return (
      <div className="container">
        <h1>Hi React, this is Morgan</h1>
        <Table nameData={names} />
      </div>
    )
  }
}

export default App