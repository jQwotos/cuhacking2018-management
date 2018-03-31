import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class Spots extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col className="Locations column-heading" sm={12}>
        <h2>Important Locations</h2>
        <Row>
          <Col sm={12} md={6}>
            <ul className="schedule-col spot-list">
              <li className="schedule-head"><h4>2nd Floor</h4></li>
              <li>Fenn Lounge (RC 227)</li>
              <li>Sponsor Hall (RC 270\/272\/274)</li>
              <li>Hacking Room (RC 208)</li>
              <li>Hacking Room (RC 212)</li>
              <li>Hacking Room (RC 213)</li>
              <li>Mentor Room (RC 210)</li>
              <li>Martello Mentor Room (RC 209)</li>
              <li>Workshop Room (RC 214)</li>
              <li>HQ (RC 211)</li>
            </ul>
          </Col>
          <Col sm={12} md={6}>
            <ul className="schedule-col spot-list">
              <li className="schedule-head"><h4>3rd Floor</h4></li>
              <li>Hacking Hall (RC 372)</li>
            </ul>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default Spots;
