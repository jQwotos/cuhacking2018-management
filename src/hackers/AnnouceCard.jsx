/* Hackers Page designed by David Voicu */

import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const AnnouceCard = (props) => {
  var style = {
    boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.5)"
  }
  return (
    <div>
      <Card style={style}>
        <CardBody>
          <CardTitle>Annoucement</CardTitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default AnnouceCard;
