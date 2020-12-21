import React, {Component} from 'react'

class TextTyper extends Component {
    state = {
        wordCount: 25,
        wordList: [""],
        randomWords: ["the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"],
        textDisplay: <span>nothing</span>
    }

    setText = () => {
        this.state.wordList = []
        
        for(var i = 0; i < this.state.wordCount; i++)
        {
            var randomWord = this.state.randomWords[Math.floor(Math.random() * this.state.randomWords.length)]
            this.state.wordList = [...this.state.wordList, randomWord]
        }

        const newTextDisplay = this.state.wordList.map((word, index) => {
            return (
                <span key={index}>{word} </span>
            )
        })
        
        this.setState({
            textDisplay: newTextDisplay
        })
    }

    componentDidMount()
    {
        this.setText()
    }

    render() {
        let displayText = this.state.text
        let textDisplay = this.state.textDisplay

        return (
            <div id="command-center">
                <div id="typing-area">
                    <div id="text-display" style={textDisplayStyle}>
                        {textDisplay}
                    </div>
                    <div className="bar">
                        <input id="input-field" type="text" spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" tabIndex="1" className="" style={barStyle} />
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

const barStyle = {
    direction: 'ltr'
}

export default TextTyper