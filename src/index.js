import React, {Component} from 'react'
import ReactDOM from 'react-dom'
//import './index.css'
import './style.css'
//import App from './App'
import TextTyper from './TextTyper'
import CodeTyper from './CodeTyper'

const language = 'java'
const codeText = 
`class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}`

ReactDOM.render(<CodeTyper language={language} codeText={codeText}/>, document.getElementById('root'))