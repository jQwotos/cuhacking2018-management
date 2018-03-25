import React, { Component } from 'react';
// import { connect } from 'react-redux';

import { ListGroup, ListGroupItem, ListItem, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

import { db } from '../fire';

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      text: "",
    }
  }

  findAnnouncement(id) {
    for (var i = 0; i < this.state.announcements.length; i++) {
      if (this.state.announcements[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  componentWillMount() {
    let announcementsRef = db.ref("announcements").orderByKey().limitToLast(1000)
    announcementsRef.on('child_added', snapshot => {
      let announcement = {
        text: snapshot.val(),
        id: snapshot.key,
      }

      this.setState({
        announcements: ([announcement]).concat(this.state.announcements)
      })
      console.log(this.state.announcements);
    })

    announcementsRef.on('child_removed', snapshot => {
      this.setState({
        announcements: this.state.announcements.filter(function(announcement) {
          return announcement.id !== snapshot.key
        })
      });
    })

  }

  addAnnouncement() {
    // e.preventDefault();
    let today = new Date();

    db.ref("announcements").push({
      text: this.state.text,
      date: (new Date()).toString(),
      timestamp: Date.now()
    });;  }

  deleteAnnouncement(id) {
    db.ref("announcements").child(id).remove();
    console.log('Delete announcement', id);
  }

  render() {
    return (
      <Col className="Announcements" sm={12} md={6} id="announcements">
        <h2>Announcements</h2>
          <FormGroup
            controlId=""
          >
            <ControlLabel>Message</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter message..."
              name=""
              onChange={(event) => this.setState({text: event.target.value})}
              />
          </FormGroup>
          <Button type="button" className="btn-success" onClick={() => this.addAnnouncement()}>Submit</Button>
        <ListGroup>
          {
            this.state.announcements.map(announcement => {
              return (
                  <ListGroupItem key={ announcement.id }>
                    <ListGroupItem header={ announcement.text.text }>
                      { announcement.text.date }
                      <a className="pull-right" onClick={() => this.deleteAnnouncement( announcement.id )}>
                        &#x2715;
                      </a>
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

export default Announcements;
