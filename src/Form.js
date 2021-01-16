import React, {Component} from 'react'

class Form extends Component {
    initialState = {
        number: '',
        name: '',
        wpm: '',
        time: '',
        acc: '',
    }

    state = this.initialState

    handleChange = (event) => {
        const {name, value } = event.target

        this.setState({
            [name]: value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {
        const {number, name, wpm, time, acc} = this.state;

        return (
            <form>
                <label htmlFor="#">#</label>
                <input
                    type="text"
                    name="number"
                    id="number"
                    value={number}
                    onChange={this.handleChange} /> 

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.handleChange} />
                    
                <label htmlFor="wpm">WPM</label>
                <input
                    type="text"
                    name="wpm"
                    id="wpm"
                    value={wpm}
                    onChange={this.handleChange} />
                
                <label htmlFor="time">Time</label>
                <input
                    type="text"
                    name="time"
                    id="time"
                    value={time}
                    onChange={this.handleChange} />
                
                <label htmlFor="acc">Accuracy</label>
                <input
                    type="text"
                    name="acc"
                    id="acc"
                    value={acc}
                    onChange={this.handleChange} />
                    
                <input type="button" value="Submit" onClick={this.submitForm} /> 
            </form>
        )
    }
}

export default Form;