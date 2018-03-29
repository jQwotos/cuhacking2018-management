import React, { Component } from 'react';
import { Navbar, Grid, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { db } from '../../fire';

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

  renderEvent(event) {
    const time = this.extractTime(event.text.date);
    const endTime = event.text.endTime != "" ? (<span> to { event.text.endTime }</span>) : (<span></span>);
    const extra = event.text.extra != "" ? (<i><br></br>{ event.text.extra }</i>) : (<span></span>);
    return (
      <li className="event-item">
        { time }{ endTime } - { event.text.title }
        { extra }
      </li>
    )
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
      <Col className="Schedule" sm={12} md={6}>
        <h2>Schedule</h2>
        <Row>
          <Col sm={12} md={6}>
            <ul className="schedule-col">
              <li className="schedule-head">Saturday March 31st</li>
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
                <li className="schedule-head">Sunday April 1st</li>
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
