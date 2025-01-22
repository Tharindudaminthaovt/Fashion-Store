import React from "react";
import { Card, Badge } from "react-bootstrap";
import "./item.scss";

const Item = ({ item }) => {
  return (
    <Card className="hover-card" id="shared-item-card">
      <div className="image-wrapper">
        {
          item.category && (<Badge className="category-badge">{item.category}</Badge>)
        }

        <Card.Img variant="top" src={item.image} className="item-img" />
      </div>
      {
        item.description ? (
          <Card.Body className="card-content">
            <div className="card-description">{item.description}</div>
            <Card.Title>{item.name}</Card.Title>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
          </Card.Body>
        )
      }

    </Card>
  );
};

export default Item;
