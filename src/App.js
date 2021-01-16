import React, {Component} from 'react'
import Table from './Table'
import Form from './Form'
import CodeTyper from './CodeTyper'
import CodeTyper2 from './CodeTyper2'

class App extends Component {
    state = {
        wpm: '',
        time: '',
        acc: '',
        scores: [],
        language: 'java',
        codeText: 
`class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}`
    }

    removeScore = (index) => {
        const scores = this.state.scores

        this.setState({
            scores: scores.filter((score, i) => {
                return i !== index
            }),
        })
    }

    submitScore = (score) => {
        this.setState({scores: [...this.state.scores, score]})
    }

    showResults = (score) => {
        console.log("All words typed out. Showing results.")

        const wpm = score.wpm
        const time = score.time + " minutes"
        const acc = score.acc + "%"

        this.setState({
            wpm: wpm,
            time: time,
            acc: acc
        })
    }

    render() {
        const scores = this.state.scores

        const leaderboard =
            <div className="container" style={{color: 'white', maxWidth: "70rem"}}>
                <h2>Leaderboard</h2>
                <Table scoreData={scores} removescore={this.removescore}/>
                <Form handleSubmit={this.submitScore}/>
            </div>

        return (
            <div>
                <CodeTyper2 language={this.state.language} codeText={this.state.codeText} submitScore={this.showResults}/>
                <div className="results" id="typing-area" style={{color: 'white', maxWidth: "20rem"}}>
                    <h2>Results</h2>
                    <div>WPM: {this.state.wpm}</div>
                    <div>Time: {this.state.time}</div>
                    <div>Accuracy: {this.state.acc}</div>
                </div>
            </div>
        )
    }
}

export default App