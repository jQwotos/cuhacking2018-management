import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, browserHistory } from 'react-router';

// import { Provider } from 'react-redux';

import Admin from './components/Admin';
import Mentor from './components/Mentor';
import Hackers from './components/hackers/Hackers';

ReactDOM.render(
  <Router path={`${process.env.PUBLIC_URL}/`} history={browserHistory}>
    <Route path={`${process.env.PUBLIC_URL}/admin`} component={Admin} />
    <Route path={`${process.env.PUBLIC_URL}/mentor`}component={Mentor} />
    <Route path={`${process.env.PUBLIC_URL}/`} component={Hackers} />
  </Router>, document.getElementById('root')
)
