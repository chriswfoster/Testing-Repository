import React, { Component } from 'react';
import axios from 'axios';
import './CodeSnipper.css';

class CodeSnipper extends Component{
  constructor(){
    super();

    this.state= {
      text: '',
      code: ''
    }
    this.handleCodeInput= this.handleCodeInput.bind(this);
    this.codify= this.codify.bind(this);
    this.submitQuestion= this.submitQuestion.bind(this);
  }

  handleCodeInput(userInput){
    this.setState({ text: userInput });
  }

  codify(){
    this.setState({ code: this.state.text, text: '' });
  }

  submitQuestion(){
    axios.post('/api/questions', { code: this.state.code }).then(response=> console.log(response.data));
  }

  render(){
    return(
      <div className='code-main-container'>
        <textarea value={this.state.text} onChange={ (e)=> this.handleCodeInput(e.target.value) }></textarea>
        <button onClick={ ()=> this.codify() }>CODIFY</button>
        <button onClick={ ()=> this.submitQuestion() }>SUBMIT QUESTION BITCH</button>
        <div className='result-box'>
          <pre>
            <code>
              {this.state.code}
            </code>
          </pre>
        </div>
      </div>
    )
  }
}

export default CodeSnipper;
