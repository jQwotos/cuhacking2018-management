import React, { Component } from 'react';
import Auth from './Auth'
import firebase from 'firebase';

class App extends Component {
  componentWillMount() {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Auth />
      </div>
    )
  }
}
export default App;
