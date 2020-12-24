import React, {Component} from 'react'

class TextTyper extends Component {
    state = {
        randomWords: ["the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"],
        wordCount: 25,
        wordList: [""],
        input: '',
        currentWord: 0,
        textDisplay: <span>nothing</span>,
        barClass: ""
    }

    setText = () => {
        // reset values
        this.state.wordList = []
        this.state.currentWord = 0
        
        // fill wordList with random words
        for(var i = 0; i < this.state.wordCount; i++)
        {
            var randomWord = this.state.randomWords[Math.floor(Math.random() * this.state.randomWords.length)]
            //this.state.wordList = [...this.state.wordList, randomWord]
            this.state.wordList.push(randomWord)
        }

        // Display words on displaybox and store classNames into an array
        const newTextDisplay = this.state.wordList.map((word, index) => {
            return (
                <span key={index} className=''>{word} </span>
            )
        })

        // Highlight first word
        newTextDisplay[this.state.currentWord] = <span key={this.state.currentWord} className='highlight'>{this.state.wordList[this.state.currentWord]} </span>
        
        this.setState({
            textDisplay: newTextDisplay,
            input: '',
            barClass: '',
        })
    }

    handleChange = (event) => {
        this.setState({input: event.target.value})

        // check if the typed letters match the current word so far
        if(this.state.currentWord < this.state.wordList.length-1)
        {
            const currentWordSlice = this.state.wordList[this.state.currentWord].slice(0,event.target.value.length);
            this.setState({
                barClass: event.target.value === currentWordSlice ? '' : 'wrong'
            })
        }

        // typed word is submitted once spacebar (' ') is pressed
        const lastLetter = event.target.value.slice(-1)
        if(lastLetter === ' ')
        {
            // if field was already empty or last word was already typed out, ignore.
            if(this.state.input === '' || this.state.currentWord >= this.state.wordList.length)
            {
                this.setState({
                    input: '',
                    barClass: ''
                })
            }
            else // word was typed out, determine if it matches current word
            {
                if(this.state.input === this.state.wordList[this.state.currentWord]) // correct
                {
                    this.setHighlights('highlight correct')
                }
                else // wrong
                {
                    this.setHighlights('highlight wrong')
                }

                this.setState({
                    input: '',
                    barClass: ''
                })
            }
        }
    }

    setHighlights = (name) => {
        const newTextDisplay = this.state.textDisplay
        
        // set className of typed out word to set correct or wrong highlight colors
        newTextDisplay[this.state.currentWord] = <span key={this.state.currentWord} className={name}>{this.state.wordList[this.state.currentWord]} </span>
    
        // next word
        this.state.currentWord++
        newTextDisplay[this.state.currentWord] = <span key={this.state.currentWord} className='highlight'>{this.state.wordList[this.state.currentWord]} </span>
    
        this.setState({
            textDisplay: newTextDisplay
        })
    }

    componentDidMount()
    {
        this.setText()
    }

    render() {
        const textDisplay = this.state.textDisplay
        const barClass = this.state.barClass
        const input = this.state.input

        return (
            <div id="command-center">
                <div className='bar'>
                    <div id="left-wing">
                        <span id="word-count" style={{display: 'inline'}}>Wordcount: {this.state.wordCount}</span>
                    </div>
                    <div id="right-wing">WPM: N/A / ACC: N/A</div>
                </div>
                <div id="typing-area">
                    <div id="text-display" style={{display: 'block', height: 'auto', direction: 'ltr'}}>
                        {textDisplay}
                    </div>
                    <div className="bar">
                        <input 
                            id="input-field" 
                            value={input}
                            onChange={this.handleChange} 
                            type="text" 
                            spellCheck="false" 
                            autoComplete="off" 
                            autoCorrect="off" 
                            autoCapitalize="off" 
                            tabIndex="1" 
                            className={barClass} 
                            style={{direction: 'ltr'}} />
                        <button id="redo-button" onClick={this.setText} tabIndex="2">redo</button>
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

export default TextTyper