import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CodeSnipper from '../CodeSnipper/CodeSnipper';
import './QuestionForm.css';

class QuestionForm extends Component {
  render() {
    return (
      <div>
        <div className="questionHere">
          <div className="firstQBox">
            <div>
              <div>
                <h1>Question Form View</h1>
              </div>
              <div className="inputField">
                <p>Insert Questions into Me</p>
                <input />
              </div>
              <div className="roundDivs">
                <div className="inRoundDivs">
                  <p>Snippits</p>
                </div>
                <div className="inRoundDivs">
                  <p>Dropdown</p>
                </div>
              </div>
            </div>
            <div className="secondBox">
              <div classname="submitBox">
                <button className="submitQuestion">Ask My ?</button>
              </div>
              <div>
                <h3 className="submitQuestion">Submit</h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <CodeSnipper />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QuestionForm;
