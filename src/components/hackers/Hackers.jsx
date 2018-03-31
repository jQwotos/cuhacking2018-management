import React, { Component } from 'react';
import firebase from 'firebase';
import { Grid,
  Row,
  Nav,
  NavItem,
  Navbar,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
 } from 'react-bootstrap';
import Particles from 'react-particles-js';

import { db } from '../../fire';

import Announcements from './Announcements';
import Schedule from './Schedule';

class Hackers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particles_options: {
        "particles": {
          "number": {
            "value":10,
            "density":{
              "enable":true,
              "value_area":552.4033491425909
            }
          },
          "color":{
            "value":"#ffffff"
          },
          "shape":{
            "type":"polygon",
            "stroke": {
              "width":0,
              "color":"#000000"
            },
            "polygon": {
              "nb_sides":6
            },
            "image": {
              "src":"img/github.svg",
              "width":70,
              "height":100
            }
          },
          "opacity":{
            "value":1,
            "random":true,
            "anim":{
              "enable":false,
              "speed":1,
              "opacity_min":0.1,
              "opacity_max":0.3,
              "sync":false
            }
          },
          "size":{
            "value":4,
            "random":true,
            "anim":{
              "enable":false,
              "speed":40,
              "size_min":0.1,
              "sync":false
            }
          },"line_linked": {
            "enable":true,
            "distance":150,
            "color":"#ffffff",
            "opacity":0.4,
            "width":1
          },
          "move":{
            "enable":true,
            "speed":1.5782952832645452,
            "direction":"none",
            "random":true,
            "straight":false,
            "out_mode":"out",
            "bounce":false,
            "attract":{
              "enable":false,
              "rotateX":600,
              "rotateY":1200
            }
          }
        },
          "retina_detect":true
        },
      particles_style: {position: "fixed", top: 0, left: 0, width: "100%", height: "100%"},
      showMentorHelp: false,
      location: "",
      problem_description: "",
      person_name: ""
    }
  }

  openMentorHelp(){
    this.setState({showMentorHelp: true});
  }

  closeMentorHelp() {
    this.setState({showMentorHelp: false});
  }

  submitRequest() {
    if (
      this.state.location.trim() != "" &&
      this.state.problem_description != "" &&
      this.state.person_name != ""
    ) {
      db.ref("mentoring").push({
        location: this.state.location,
        problem_description: this.state.problem_description,
        name: this.state.person_name,
        timestamp: Date.now()
      });
      this.closeMentorHelp();
      alert("Request Submitted!");
    }
  }

  render() {
    return (
      <div className="Hackers">
        <Particles params={this.state.particles_options} style={this.state.particles_style} />
        <Navbar className="hackers-nav">
          <Navbar.Header>
            <Navbar.Brand className="navbar-title">
              <a href="#">CUHacking LIVE</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={2} href="https://drive.google.com/file/d/1xs7imIUCJoKelhfm7jUHDl992LD9fioz/view?usp=sharing">
              <Button href="https://drive.google.com/file/d/1xs7imIUCJoKelhfm7jUHDl992LD9fioz/view?usp=sharing">
                Hacker Guide
              </Button>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <Button onClick={() => this.openMentorHelp()}>
                Request Help
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
        <Grid>
          <Row>
            <Announcements />
            <Schedule />
          </Row>
        </Grid>
        <Modal show={this.state.showMentorHelp} onHide={() => this.closeMentorHelp()}>
          <Modal.Header closeButton>
            <Modal.Title>Request Mentor Help</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Name"
                onChange={(event) => this.setState({person_name: event.target.value})}
                ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Room number</ControlLabel>
              <FormControl
                type="text"
                placeholder="Room number"
                onChange={(event) => this.setState({location: event.target.value})}
                ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Problem Description</ControlLabel>
              <FormControl
                type="text"
                placeholder="Problem Description"
                onChange={(event) => this.setState({problem_description: event.target.value})}
                ></FormControl>
            </FormGroup>
            <Button type="button" className="btn-success" onClick={() => this.submitRequest()}>Submit</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeMentorHelp()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Hackers;
