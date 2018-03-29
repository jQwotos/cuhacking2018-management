/* Hackers Page designed by David Voicu */

import React, { Component } from 'react';
import './App.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: []
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <h1 style={{fontSize:'30px', fontWeight: 'bold', color: '#f5f5f5', padding:'10px', borderBottom: '2px solid #f5f5f5', textAlign:'right'}}>Schedule</h1>
    )
  }
}

export default Schedule
