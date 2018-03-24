import React, { Component } from 'react';

import { db } from '../fire';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    }
  }

  componentWillMount() {
    let requestsRef = db.ref("mentoring").orderByChild("timestamp")
    requestsRef.on('child_added', snapshot => {
      let request = {
        text: snapshot.val(),
        id: snapshot.key,
      }
    })

    this.setState({
      requests: (this.state.requests).concat([request])
    })
  }

  render() {
    <ListGroup>
      {
        
      }
    </ListGroup>
  }
}
