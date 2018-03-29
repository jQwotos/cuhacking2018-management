import React, { Component } from 'react';
import firebase from 'firebase';
import { Navbar, Grid, ListGroup, Col, ListGroupItem } from 'react-bootstrap';

import { db } from '../../fire';

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
    }
  }

  componentWillMount() {
    let announcementsRef = db.ref("announcements").orderByKey();
    announcementsRef.on('child_added', snapshot => {
      let announcement = {
        text: snapshot.val(),
        id: snapshot.key,
      }

      this.setState({
        announcements: ([announcement]).concat(this.state.announcements)
      })
    });
    announcementsRef.on('child_removed', snapshot => {
      this.setState({
        announcements: this.state.announcements.filter(function(announcement) {
          return announcement.id !== snapshot.key
        })
      });
    });
  }

  render() {
    return (
      <Col className="Announcements" sm={12} md={6} id="announcements">
        <h2>Announcements</h2>
        <ListGroup>
          {
            this.state.announcements.map(announcement => {
              return (
                <ListGroupItem header={ announcement.text.text }>
                  { announcement.text.date }
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
