import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Articles from './articles';

const App = props => (
  <Router>
    <div>
      <Route exact path='/' component={ Articles } />
      <Route path='/articles' component={ Articles } />
    </div>
  </Router>
);

export default App;
