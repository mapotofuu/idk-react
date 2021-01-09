import React, {Component} from 'react'

// Components
import { CodeBlock, dracula } from "react-code-blocks";
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

// Used as enums
const conditions = {
    notStarted: 'notStarted',
    typing: 'typing',
    finished: 'finished'
}

class CodeTyper extends Component {
    state = {
        wordList: [""],
        input: '',
        correctKeys: '',
        totalKeysCount: 0,
        highlight: [0, 5],
        currentWord: 0,
        inputClass: "",
        results: "WPM: XX / ACC: XX",
        startDate: 0,
        typingState: '',
        codeText: 
`class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}`
    }

    setText = () => {
        // Reset values
        this.state.wordList = []
        this.state.currentWord = 0
        this.state.correctKeys = ''
        this.state.totalKeysCount = 0
        this.state.typingState = conditions.notStarted
        
        // Split text by punctations and whitespaces
        // [\w-]+ means any word/letters including '-'
        // [^\w\s] means any characters that are not words/letters or whitespaces, so any remaining punctuations.
        this.state.wordList = this.state.codeText.match(/[\w-]+|[^\w\s]/g)
        
        this.setState({
            input: '',
            inputClass: '',
        })
    }

    handleChange = (event) => {
        //console.log(event.target.value)
        if(this.state.typingState === conditions.notStarted)
        {
            this.state.startDate = Date.now()
            console.log("First letter typed. Starting timer.")
            this.state.typingState = conditions.typing
        }

        if(this.state.typingState === conditions.typing)
        {
            // If the length of current input with mistake is longer than length of correct keys, do not allow user to continue typing until mistake is fixed.
            if(event.target.value.length < this.state.correctKeys.length + 10)
            {
                this.setState({input: event.target.value})

                const currentSlice = this.state.codeText.slice(0,event.target.value.length);

                if(event.target.value === currentSlice)
                {
                    this.state.correctKeys = event.target.value
                    this.setState({
                        highlight: [0, 0]
                    })
                }
                else
                {
                    this.setState({
                        highlight: [this.state.correctKeys.length, event.target.value.length]
                    })
                }

                this.state.totalKeysCount++

                console.log('Correct Keys: ' + this.state.correctKeys.length)
                console.log('Total Keys: ' + this.state.totalKeysCount)

                this.showResults()
            }

            if(this.state.codeText === event.target.value) // Text fully typed out correctly. Stop timer.
            {
                this.state.typingState = conditions.finished
                this.showResults()
                return;
            }
        }
    }

    handleKeyDown = (event) => {
        /*
        let value = this.state.input,
        selStartPos = event.target.selectionStart;

        console.log(event.target);

        // handle 4-space indent on
        if (event.key === "Tab") {
        value =
            value.substring(0, selStartPos) +
            "    " +
            value.substring(selStartPos, value.length);
        event.target.selectionStart = selStartPos + 3;
        event.target.selectionEnd = selStartPos + 4;
        event.preventDefault();

        this.handleChange(event)
        }
        */

        if(event.key === 'Backspace' || event.key === 'Delete') {
            //console.log('delete')

            if(this.state.totalKeysCount > 0 && this.state.totalKeysCount >= this.state.correctKeys.length)
                this.state.totalKeysCount--
        }
    }

    showResults = () => {
        //console.log("All words typed out. Showing results.")
        let words, minute, acc

        words = this.state.correctKeys.length / 5
        minute = (Date.now() - this.state.startDate) / 1000 / 60

        acc = Math.floor((this.state.correctKeys.length / this.state.totalKeysCount) * 100)

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
        const inputClass = this.state.inputClass
        const input = this.state.input
        const results = this.state.results

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
                            text={this.state.codeText}
                            showLineNumbers={true}
                            theme={dracula}
                            wrapLines={true}
                            style={{background: 'transparent'}}
                        />
                    </div>
                    <div className="column">
                        <HighlightWithinTextarea
                            value={input}
                            highlight={this.state.highlight}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
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

const highlightTextAreaContainerStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
    padding: '8px 0px 8px 10px',
    borderRadius: '0.2rem',
    resize: 'none',

    background: '#2c2e40'
}

export default CodeTyper