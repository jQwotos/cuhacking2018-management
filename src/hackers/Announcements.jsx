/* Hackers Page designed by David Voicu */

import React, { Component } from 'react';
import firebase from 'firebase';

import { db } from '../fire';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Schedule from './Schedule';
import AnnouceCard from './AnnouceCard';

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    };
  }

  componentWillMount() {
    let announcementsRef = db.ref('announcements').orderByKey().limitToLast(100);
    announcementsRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.message)});
    })
  }
  render() {
    return (
      <div className="announcements" style={{paddingRight: '25px', paddingLeft: '25px'}}>
      <Row>
          <Col xs="6"><h1 style={{fontSize:'30px', fontWeight: 'bold', color: '#f5f5f5', padding:'10px', borderBottom: '2px solid '}}>Announcements</h1>
        <AnnouceCard />
        <ul>
          {

            this.state.announcements.map(announcement => <li> </li>)
          }
        </ul>
        </Col>
          <Col xs="6"><Schedule /></Col>
        </Row>

      </div>
    )
  }
}

export default Announcements;
