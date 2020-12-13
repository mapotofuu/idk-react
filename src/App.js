import React, { Component } from 'react';
import Table from './Table';

class App extends Component {
  state = {
    names: [
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
      }
    ]
  }

  removeName = (index) => {
    const {names} = this.state;

    this.setState({
      names: names.filter((name, i) => {
        return i !== index
      }),
    })

  }

  render() {
    const { names } = this.state;

    return (
      <div className="container">
        <h1>Hi React, this is Morgan</h1>
        <Table nameData={names} removeName={this.removeName} />
      </div>
    )
  }
}

export default App