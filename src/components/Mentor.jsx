import React, { Component } from 'react';
import MentorAuth from './MentorAuth';

class Mentor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MentorAuth />
      </div>
    )
  }
}

export default Mentor;
