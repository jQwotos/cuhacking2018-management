import React, { Component } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Modal, Navbar, Nav, NavItem, Grid, Row } from 'react-bootstrap';
import firebase from 'firebase';
import fire from '../fire';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/mentor',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSucess: () => false
  }
};

class MentorAuth extends Component {
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
              <a href="#">CUHacking 2018 Mentor Panel</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1}>
                <a onClick={() => firebase.auth().signOut()}>Sign out</a>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
    )
  }
}

export default MentorAuth;
