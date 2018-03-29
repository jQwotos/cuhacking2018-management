import React, { Component } from 'react';
import { Navbar, Grid, Row, Col, ListGroupItem, ListGroup, Collapse, Well, Modal, Button } from 'react-bootstrap';
import { db } from '../../fire';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      show: false,
      modal: null,
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
          schedule: (this.state.schedule).concat([event])
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

  extractTime(date) {
    return date.replace("2018-03-31T", "").replace("2018-04-01T", "");
  }

  killEventModal() {
    this.setState({
      show: false,
      modal: null,
    })
  }

  createEventModal(event) {
    const modal = (
      <Modal.Dialog show={this.state.show} onHide={() => this.killEventModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{ event.text.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{ event.text.extra }</h4>
          <p>{ event.text.description }</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.killEventModal()}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
    this.setState({
      show: true,
      modal,
    });
  }

  renderEvent(event) {
    const time = this.extractTime(event.text.date);
    const endTime = event.text.endTime != "" ? (<span> to { event.text.endTime }</span>) : (<span></span>);
    const extra = event.text.extra != "" ? (<i><br></br>{ event.text.extra }</i>) : (<span></span>);

    if (event.text.description != "") {
      return (
        <li className="event-item hoverable" key={ event.id } onClick={() => this.createEventModal(event)}>
          { time }{ endTime } - { event.text.title }
          { extra }
        </li>
      )
    } else {
      return (
        <li className="event-item" key={ event.id }>
          { time }{ endTime } - { event.text.title }
          { extra }
        </li>
      )
    }

  }

  renderSat(event) {
    if (event.text.date.includes("2018-03-31")) {
      return this.renderEvent(event);
    } else {
      return "";
    }
  }

  renderSun(event) {
    if (event.text.date.includes("2018-04-01")) {
      return this.renderEvent(event);
    } else {
      return "";
    }
  }

  render() {
    return (
      <Col className="Schedule column-heading" sm={12} md={6}>
        { this.state.modal }
        <h2>Schedule</h2>
        <Row>
          <Col sm={12} md={6}>
            <ul className="schedule-col">
              <li className="schedule-head"><h4>Saturday March 31st</h4></li>
              {
                this.state.schedule.map(event => {
                  return (
                    this.renderSat(event)
                  )
                })
              }
            </ul>
          </Col>
          <Col sm={12} md={6}>
              <ul className="schedule-col">
                <li className="schedule-head"><h4>Sunday April 1st</h4></li>
                {
                  this.state.schedule.map(event => {
                    return (
                      this.renderSun(event)
                    )
                  })
                }
              </ul>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default Schedule;
