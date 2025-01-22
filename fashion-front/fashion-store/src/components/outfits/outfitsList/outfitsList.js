import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Spinner, Alert } from "react-bootstrap";
import { getOutfits } from "../../../actions/outfitsActions";
import "../outfits.scss";
import Item from "../../shared/item/item";
import { useNavigate } from "react-router-dom";

const OutfitsList = () => {
  const dispatch = useDispatch();
  const { loading, outfits, error } = useSelector((state) => state.outfitReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOutfits());
  }, [dispatch]);

  const outfitClick = (outfit) => {
    navigate(`/outfits/edit/${outfit._id}`);
  }

  return (
    <Row xs={1} md={1} className="g-4 mx-5 my-1 h-100" id="outfitsList">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && outfits.length === 0 && (
        <div className="text-center text-white">No outfits found!</div>
      )}
      {outfits.map((outfit) => (
        <Col key={outfit.id} onClick={() => outfitClick(outfit)}>
          <Card className="outfit-card h-100">
            <Card.Body className="outfit-card-body">
              <div className="card-titless">
                <div className="outfit-name">{outfit.name}</div>
                <div className="outfit-occasion">
                  <span className="badge bg-primary">{outfit.occasion}</span>
                </div>
              </div>
              <div className="outfit-desc">{outfit.description}</div>
              <div className="">
                <Row xs={1} md={3} className="g-4 h-100" id="itemsList">
                  {outfit.items.map((item) => {
                    var it = {
                      _id: item.itemId,
                      name: item.itemName,
                      image: item.itemImage,
                    }
                    return (
                    <Col key={item._id}>{<Item item={it} />}</Col>
                  )
                  })}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OutfitsList;
