import React, { Component } from 'react';

import { ListGroup, ListGroupItem, ListItem, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

import { db } from '../fire';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: []
    }
  }

  componentWillMount() {
    let scheduleRef = db.ref("schedule").orderByChild("timestamp")
    scheduleRef.on('child_added', snapshot => {
      let event = {
        text: snapshot.val(),
        id: snapshot.key,
        }
        this.setState({
          schedule: ([event]).concat(this.state.schedule)
        })
      }
    )
  }

  render() {
    return (
      <Col className="Schedule" sm={12} md={6} id="schedule">
        <h2>Schedule</h2>
        <ListGroup>
        {
          this.state.schedule.map(event => {
            return (
              <ListGroupItem key= { event.id }>
                <ListGroupItem header={ event.text.text }>
                  <p>{ event.text.details }</p>
                  <p>{ event.text.date }</p>
                  <a className="pull-right" onClick={() => this.deleteEvent(event.id)}>&#x2715;</a>
                </ListGroupItem>
              </ListGroupItem>
            )
          })
        }
        </ListGroup>
      </Col>
    )
  }
}

export default Schedule;
