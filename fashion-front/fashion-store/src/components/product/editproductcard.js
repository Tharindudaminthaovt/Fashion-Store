"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartactions";
import imgsrc from "../../images/img1.jpg";
import { patchProduct  } from "../../actions/itemaction";

export default function EditItemCard({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("small");
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState(item || {});

  const dispatch = useDispatch();

  // Extract patchProduct state from Redux store
  const { loading, success, error } = useSelector((state) => state.patchProduct);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToCartHandler = () => {
    dispatch(addToCart(item, quantity, variant));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const saveChanges = () => {
    dispatch(patchProduct (item._id, editItem));
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  const price = item.prices?.[variant] * quantity || 0;

  return (
    <div className="m-5 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "100px" }}>
      <div onClick={handleShow}>
        <h1>{item.name}</h1>
        <img src={imgsrc} className="img-fluid" style={{ height: "200px", width: "200px" }} />
      </div>
      <div className="flex-container d-flex">
        <div className="w-100 m-1">
          <p>Variants</p>
          <select
            className="form-control"
            style={{ width: "100px" }}
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            {item.variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            className="form-control"
            style={{ width: "100px", marginRight: "800px" }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {[...Array(10).keys()].map((x, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <p>Price : {price} LKR</p>
        </div>
        <div className="m-1 w-100">
          <button className="btn" onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <p>Loading...</p>}
          {success && <p style={{ color: "green" }}>Item updated successfully!</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={editItem.name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={editItem.price || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* Add other fields as needed */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges} disabled={loading}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
