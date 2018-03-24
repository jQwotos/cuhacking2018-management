import React, { Component } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Modal, Navbar, Nav, NavItem, Grid, Row } from 'react-bootstrap';
import firebase from 'firebase';
import fire from '../fire';

import Announcements from './Announcements';
import Schedule from './Schedule';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => false
  }
};

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    }
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({
        isSignedIn: !!user
      })
    )
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    if (!this.state.isSignedIn) {
      return (
        <Modal.Dialog>
          <Modal.Body>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </Modal.Body>
        </Modal.Dialog>
      );
    }
    return (
      <div className="Auth">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">CUHacking 2018 Admin Panel</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                <a href="#announcements">Announcements</a>
              </NavItem>
              <NavItem>
                <a href="#schedule">Schedule</a>
              </NavItem>
              <NavItem eventKey={1}>
                <a onClick={() => firebase.auth().signOut()}>Sign out</a>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid data-spy="scroll">
          <Row>
            <Announcements />
            <Schedule />
          </Row>
        </Grid>
      </div>
    );
  }
  /*
  render() {
    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    )
  }
  */
}

export default Auth;
