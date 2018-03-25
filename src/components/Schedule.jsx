import React, { Component } from 'react';

import { ListGroup, ListGroupItem, ListItem, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

import { db } from '../fire';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      date: "",
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

    scheduleRef.on('child_removed', snapshot => {
      this.setState({
        schedule: this.state.schedule.filter(function(event) {
          return event.id !== snapshot.key
        })
      });
    })
  }

  addEvent() {
    db.ref("schedule").push({
      description: this.state.description,
      date: this.state.date,
      title: this.state.title
    })
  }

  deleteEvent(id) {
    db.ref("schedule").child(id).remove();
    console.log("Deleting event", id);
  }

  render() {
    return (
      <Col className="Schedule" sm={12} md={6} id="schedule">
        <h2>Schedule</h2>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter title..."
            name="title"
            onChange={(event) => this.setState({title: event.target.value})}
          >
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Description..."
            onChange={(event) => this.setState({description: event.target.value})}
            />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Date and Time</ControlLabel>
          <input type="datetime-local"
            onChange={(event) => this.setState({date: event.target.value})}
            ></input>
        </FormGroup>
        <Button type="button" className="btn-success" onClick={() => this.addEvent()}>Submit</Button>
        <ListGroup>
        {
          this.state.schedule.map(event => {
            return (
              <ListGroupItem key= { event.id }>
                <ListGroupItem header={ event.text.title }>
                  <p>{ event.text.description }</p>
                  { event.text.date }
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
