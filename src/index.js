import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, browserHistory } from 'react-router';

// import { Provider } from 'react-redux';

import Admin from './components/Admin';
import Mentor from './components/Mentor';

ReactDOM.render(
  <Router path="/" history={browserHistory}>
    <Route path="/admin" component={Admin} />
    <Route path="/mentor" component={Mentor} />
  </Router>, document.getElementById('root')
)
