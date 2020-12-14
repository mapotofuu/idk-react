import React, { Component } from 'react';

class Form extends Component {
  initialState = {
    firstname: '',
    lastname: ''
  }

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    })
  }

  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {
    const { firstname, lastname } = this.state;

    return (
      <form>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          name="firstname"
          id="lastname"
          value={firstname}
          onChange={this.handleChange}
        />
        <label htmlFor="lastname">First Name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={lastname}
          onChange={this.handleChange}
        />
        <input
          type="button"
          value="Submit"
          onClick={this.submitForm}
        />
      </form>
    );
  }
}

export default Form;