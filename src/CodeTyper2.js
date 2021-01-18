import { NONAME } from 'dns';
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

class CodeTyper2 extends Component {
     // Language and codeText part of props.
    state = {
        //wordList: [""],
        input: '',
        correctKeys: '',
        wrongKeys: '',
        totalKeysCount: 0,
        highlight: [0, 0],
        //currentWord: 0,
        results: "WPM: XX / ACC: XX",
        startDate: 0,
        typingState: '',

        time: '',
        inputField: React.createRef()
    }

    setText = () => {
        // Reset values
        //this.state.wordList = []
        //this.state.currentWord = 0
        this.state.correctKeys = ''
        this.state.wrongKeys = ''
        this.state.totalKeysCount = 0
        this.state.highlight = [0, 0]
        this.state.startDate = 0
        this.state.typingState = conditions.notStarted
        
        // Split text by punctations and whitespaces
        // [\w-]+ means any word/letters including '-'
        // [^\w\s] means any characters that are not words/letters or whitespaces, so any remaining punctuations.
        //this.state.wordList = this.state.codeText.match(/[\w-]+|[^\w\s]/g)
        
        this.setState({
            input: '',
            results: "WPM: XX / ACC: XX",
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

                this.checkCorrect(event.target.value)

                this.state.totalKeysCount++

                //console.log('Correct Keys: ' + this.state.correctKeys.length)
                //console.log('Total Keys: ' + this.state.totalKeysCount)

                this.showResults()
            }

            if(this.props.codeText === event.target.value) // Text fully typed out correctly. Stop timer.
            {
                this.state.typingState = conditions.finished
                this.showResults()

                this.submitScore()
            }
        }
    }

    handleKeyDown = (event) => {
        // Cursor should always be set after the last letter of string.
        event.target.selectionStart = this.state.input.length + 1
        event.target.selectionEnd = this.state.input.length + 1

        let value = this.state.input,
        selStartPos = event.target.selectionStart;

        // handle 2-space indent on
        if (event.key === "Tab") {
            value =
                value.substring(0, selStartPos) +
                "  " +
                value.substring(selStartPos, value.length);
            event.target.selectionStart = selStartPos + 1;
            event.target.selectionEnd = selStartPos + 2;
            event.preventDefault();

            this.state.totalKeysCount += 2

            this.setState({
                input: value
            });

            this.checkCorrect(value)
        }
        
        if(event.key === 'Backspace' || event.key === 'Delete') {
            if(this.state.totalKeysCount > 0 && this.state.totalKeysCount >= this.state.correctKeys.length)
                this.state.totalKeysCount--
        }
    }

    handleKeyUp = (event) => {
        // Cursor should always be set after the last letter of string.
        event.target.selectionStart = this.state.input.length + 1
        event.target.selectionEnd = this.state.input.length + 1
    }

    checkCorrect = (value) => {
        const currentSlice = this.props.codeText.slice(0,value.length)

        if(value === currentSlice) // correct
        {
            this.state.correctKeys = value
            this.setState({
                highlight: [0, 0],
                wrongKeys: ''
            })
        }
        else // wrong
        {
            //const wrong = this.props.codeText.slice(this.state.correctKeys.length, event.target.value.length)
            const wrong = value.slice(this.state.correctKeys.length, value.length)

            this.setState({
                highlight: [this.state.correctKeys.length, value.length],
                wrongKeys: wrong,
            })
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

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
      
    submitScore = () => {
        let score = {
            wpm: 0,
            time: '',
            acc: 0
        }

        const words = this.state.correctKeys.length / 5
        const minute = (Date.now() - this.state.startDate) / 1000 / 60

        score.time = this.millisToMinutesAndSeconds(Date.now() - this.state.startDate)

        score.acc = Math.floor((this.state.correctKeys.length / this.state.totalKeysCount) * 100)

        score.wpm = Math.floor(words / minute)

        this.props.submitScore(score)
    }

    clickedOn = () => {
        console.log("Element clicked")
    }

    componentDidMount()
    {
        this.setText()
    }

    handleFocus = () =>
    {
        this.state.inputField.current.focus()
    }

    render() {
        const input = this.state.input
        const results = this.state.results

        const pastOutline = 
        <div className="backdrop"
            style={{
                background: 'transparent', 
                width: '100%', 
                height: '100%', 
                resize: 'none', 
                pointerEvents: 'none',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                lineHeight: '1.66667',
                padding: '8px 8px 0px 38px',
                color: 'white',
                //opacity: '0.5',
                whiteSpace: 'pre'
            }} >
            <span style={{opacity: '0.5'}}>{this.props.codeText}</span>
        </div>

        return (
            <div id="command-center">
                <div className='bar'>
                    <div id="left-wing">{this.state.language}</div>
                    <div id="right-wing">{results}</div>
                </div>
                <div id="typing-area" className="row">
                    
                        <div className="container" onClick={this.handleFocus}>
                            <div className="backdrop">
                                <div className="highlights">
                                    <span>{this.state.correctKeys}</span>
                                    <mark>{this.state.wrongKeys}</mark>
                                </div>
                            </div>

                            <div className="backdrop">
                                <textarea
                                    ref={this.state.inputField}
                                    value={input}
                                    spellCheck="false" 
                                    autoComplete="off" 
                                    autoCorrect="off" 
                                    autoCapitalize="off" 
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyDown}
                                    onKeyUp={this.handleKeyUp}
                                    style={{
                                        background: 'transparent', 
                                        width: '100%', 
                                        height: '100%', 
                                        resize: 'none', 
                                        pointerEvents: 'auto',
                                        fontSize: 'inherit',
                                        fontFamily: 'inherit',
                                        lineHeight: '1.66667',
                                        padding: '8px 0px 0px 38px',
                                        caretColor: 'white',
                                        color: 'transparent',
                                        outline: 'none',
                                        border: 'none'
                                    }}
                                />
                            </div>
                            <CodeBlock
                                language={this.props.language}
                                text={this.props.codeText}
                                showLineNumbers={true}
                                theme={dracula}
                                wrapLines={true}
                                //codeContainerStyle={{background: 'black'}}
                                //highlight={"1"}
                                customStyle={{background: 'transparent', pointerEvents: 'none', opacity: "40%", position: "absolute"}}
                            />

                            <CodeBlock 
                                language={this.props.language}
                                //text={this.props.codeText}
                                text={this.state.input}
                                showLineNumbers={true}
                                theme={dracula}
                                wrapLines={true}
                                //codeContainerStyle={{background: 'black'}}
                                //highlight={"1"}
                                customStyle={{background: 'transparent', pointerEvents: 'none'}}
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

export default CodeTyper2