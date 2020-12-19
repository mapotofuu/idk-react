import React, {Component} from 'react'

class TextTyper extends Component {
    state = {
        text: "Class HelloWorld Class HelloWorld Class HelloWorld Class HelloWorld Class HelloWorld Class HelloWorld "
    }

    render() {
        const displayText = this.state.text

        return (
            <div id="command-center">
                <div id="typing-area">
                    <div id="text-display" style={textDisplayStyle}>
                        <p>{displayText}</p>
                    </div>
                    <div className="bar">
                        <input id="input-field" type="text" spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" tabIndex="1" className="" style={barStyle} />
                        <button id="redo-button" onClick="" tabIndex="2">redo</button>
                    </div>
                </div>
            </div>
        )
    }
}

const textDisplayStyle = {
    display: 'block',
    height: 'auto',
    direction: 'ltr'
}

const barStyle = {
    direction: 'ltr'
}

export default TextTyper