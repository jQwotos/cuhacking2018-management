import React, { Component } from 'react';

import { ListGroup, ListGroupItem, ListItem, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { db } from '../fire';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    }
  }

  markDone(id) {
    db.ref("mentoring").child(id).remove();
    console.log("Deleting request", id);
  }

  componentWillMount() {
    let requestsRef = db.ref("mentoring").orderByKey();
    requestsRef.on('child_added', snapshot => {
      let request = {
        text: snapshot.val(),
        id: snapshot.key,
      }
      this.setState({
        requests: (this.state.requests).concat([request])
      })
      console.log("this.state.requests", this.state.requests);
    })

    requestsRef.on('child_removed', snapshot => {
      this.setState({
        requests: this.state.requests.filter(function(request) {
          return request.id !== snapshot.key
        })
      });
    })
  }

  render() {
    return (
    <div className="Requests">
      <h2>Requests</h2>
      <ListGroup>
        {
          this.state.requests.map(request => {
            return (
              <ListGroupItem key={ request.id }>
                <ListGroupItem header={ request.text.location }>
                  <p>{ request.text.problem_descriotin }</p>
                  { request.text.name }
                  <a className="pull-right" onClick={() => this.markDone(request.id)}>&#10004;</a>
                </ListGroupItem>
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    </div>
  )}
}

export default Requests;
