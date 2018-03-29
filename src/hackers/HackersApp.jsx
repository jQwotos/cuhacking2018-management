/* Hackers Page designed by David Voicu */

import Announcements from './Announcements';
import Schedule from './Schedule';
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Navbar from './Navbar';
import Particles from 'react-particles-js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {} // State is the internal variables declared in dict format
  }


  render() {
    var options = {
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
      };

    return (
      <div className="App">
      <Particles params={options} style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%"}}/>
      
      <Navbar/>
        <Announcements />
      </div>
    )
  }
}

export default App;
