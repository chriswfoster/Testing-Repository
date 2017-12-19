import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//import Components to be rendered here
import StudentView from './components/StudentView';
import QuestionForm from './components/QuestionForm/QuestionForm';

export default (
  <BrowserRouter>
    <div>
      <Route component={StudentView} exact path="/student" />
      <Route component={QuestionForm} exact path="/question" />
    </div>
  </BrowserRouter>
);
