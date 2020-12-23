import React, {Component} from 'react'

class TextTyper extends Component {
    state = {
        randomWords: ["the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"],
        wordCount: 25,
        wordList: [""],
        input: '',
        currentWord: 0,
        textDisplay: <span>nothing</span>,
        //currentWordIndex: 0,
    }

    setText = () => {
        this.state.wordList = []
        this.state.currentWord = 0
        
        for(var i = 0; i < this.state.wordCount; i++)
        {
            var randomWord = this.state.randomWords[Math.floor(Math.random() * this.state.randomWords.length)]
            //this.state.wordList = [...this.state.wordList, randomWord]
            this.state.wordList.push(randomWord)
        }

        const newTextDisplay = this.state.wordList.map((word, index) => {
            return (
                //<span key={index}>{word} </span>
                <Text index={index} word={word}/>
            )
        })
        
        this.setState({
            input: '',
            textDisplay: newTextDisplay
        })
    }

    handleChange = (event) => {
        this.setState({input: event.target.value})
        
        var lastLetter = event.target.value.slice(-1)
        if(lastLetter == ' ') // word complete
        {
            this.setState({input: ''})

            if(this.state.input == this.state.wordList[this.state.currentWord]) // correct
            {
                console.log("correct")
            }
            else // wrong
            {
                console.log("wrong")
            }
            this.state.currentWord++ //next word
        }
    }

    componentDidMount()
    {
        this.setText()
    }

    render() {
        const textDisplay = this.state.textDisplay
        const input = this.state.input

        return (
            <div id="command-center">
                <div id="typing-area">
                    <div id="text-display" style={textDisplayStyle}>
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
                            className="" 
                            style={barStyle} />
                        <button id="redo-button" onClick={this.setText} tabIndex="2">redo</button>
                    </div>
                </div>
            </div>
        )
    }
}

const Text = (props) => {
    return (
        <span key={props.index}>{props.word} </span>
    )
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