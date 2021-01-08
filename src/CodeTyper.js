import React, {Component} from 'react'

// Components
import { CodeBlock, dracula } from "react-code-blocks";
import CodeEditor from './CodeEditor';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';


class CodeTyper extends Component {
    state = {
        wordList: [""],
        input: '',
        correctKeys: '',
        highlight: [0, 5],
        currentWord: 0,
        inputClass: "",
        results: "WPM: XX / ACC: XX",
        startDate: 0,
        sampleText: 
`class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}

class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}

const something = 10;`
    }

    setText = () => {
        // Reset values
        this.state.wordList = []
        this.state.currentWord = 0
        this.state.correctKeys = ''
        
        // Split text by punctations and whitespaces
        // [\w-]+ means any word/letters including '-'
        // [^\w\s] means any characters that are not words/letters or whitespaces, so any remaining punctuations.
        this.state.wordList = this.state.sampleText.match(/[\w-]+|[^\w\s]/g)
        
        this.setState({
            input: '',
            inputClass: '',
        })
    }

    handleChange = (event) => {
        if(this.state.sampleText == this.state.input) // Text fully typed out correctly. Stop timer.
            return;

        // If the length of current input with mistake is longer than length of correct keys, do not allow user to continue typing until mistake is fixed.
        if(event.target.value.length < this.state.correctKeys.length + 6)
        {
            this.setState({input: event.target.value})

            const currentSlice = this.state.sampleText.slice(0,event.target.value.length);

            if(event.target.value === currentSlice)
            {
                this.setState({
                    correctKeys: event.target.value,
                    highlight: [0, 0]
                })
            }
            else
            {
                this.setState({
                    highlight: [this.state.correctKeys.length, event.target.value.length]
                })
            }
        }
        
    }

    handleKeyDown = (event) => {

    }

    showResults = () => {
        console.log("All words typed out. Showing results.")
        let words, minute, acc

        words = this.state.correctKeys / 5
        minute = (Date.now() - this.state.startDate) / 1000 / 60
        let totalKeys = -1
        this.state.wordList.forEach(word => {
            totalKeys += word.length + 1
        });
        acc = Math.floor((this.state.correctKeys / totalKeys) * 100)

        let wpm = Math.floor(words / minute)

        this.setState({ results: "WPM: " + wpm + " / ACC: " + acc})
    }

    clickedOn = () => {
        console.log("Element clicked")
    }

    componentDidMount()
    {
        this.setText()
    }

    render() {
        const textDisplay = this.state.textDisplay
        const inputClass = this.state.inputClass
        const input = this.state.input
        const results = this.state.results

        const defaultCodeEditor = 
        <textarea 
        id="input-field" 
        value={input}
        onChange={this.handleChange} 
        onKeyDown={this.handleChange}
        type="text" 
        spellCheck="false" 
        autoComplete="off" 
        autoCorrect="off" 
        autoCapitalize="off"
        tabIndex="1" 
        className={inputClass} 
        style={{direction: 'ltr'}}
        >
        </textarea>

        return (
            <div id="command-center">
                <div className='bar'>
                    <div id="left-wing">
                        <span id="word-count" style={{display: 'inline'}}>
                            <span id="wc-10" style={{cursor: 'pointer'}} onClick={() => this.clickedOn()}>Java</span>
                        </span>
                    </div>
                    <div id="right-wing">{results}</div>
                </div>
                <div id="typing-area" className="row">
                    <div className="column">
                        <CodeBlock 
                            language="java"
                            text={this.state.sampleText}
                            showLineNumbers={true}
                            theme={dracula}
                            wrapLines={true}
                        />
                    </div>
                    <div className="column">
                        <HighlightWithinTextarea
                            value={input}
                            highlight={this.state.highlight}
                            onChange={this.handleChange}
                            containerClassName="highlighttext-within-textarea"

                            id="input-field"
                            spellCheck="false" 
                            autoComplete="off" 
                            autoCorrect="off" 
                            autoCapitalize="off"
                            tabIndex="1" 
                            className={inputClass} 
                            style={{direction: 'ltr'}}
                            placeholder="Start typing!"
                        />
                    </div>
                </div>
                <button id="redo-button" onClick={this.setText} tabIndex="2">redo</button>
            </div>
        )
    }
}

const codeStyle = {
    padding: '8px',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHight: 1.42857,
    color: 'white',
    whiteSpace: 'pre'
}

const codeBlock = {
    fontSize: 'inherit',
    fontFamily: 'inherit',
    background: 'rgb(40, 42, 54)',
    color: 'rgb(248, 248, 242)',
    borderRadius: '3px',
    display: 'flex',
    lineHeight: 1.42857,
    overflowX: 'auto',
    whiteSpace: 'pre'
}

export default CodeTyper