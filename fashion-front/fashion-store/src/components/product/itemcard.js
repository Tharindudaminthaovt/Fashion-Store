"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartactions";
import imgsrc from "../../images/img1.jpg";
import Ratings from "../reviews";
import { useNavigate } from "react-router-dom";

export default function Itemcard({ item }) {
  const [quantity, setquantity] = useState(1);
  const [variant, setvariant] = useState("small");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  function addtocart() {
    dispatch(addToCart(item, quantity, variant));
  }

  const navigate = useNavigate();

  const addToWishList = (id) => {
    navigate(`/wishlist-add/${id}`);
  };

  if (!item) {
    return <div>Loading...</div>; // Fallback UI
  }
  console.log("item in Itemcard:", item);

  const price = item.prices?.[variant] * quantity || 0;
  console.log("Item prices:", item.prices); // Log to confirm structure

  return (
    <div
      className="m-5 shadow p-3 mb-2 bg-white rounded "
      style={{ marginTop: "100px" }}
    >
      <div onClick={handleShow} style={{justifyItems:"center"}}>
        <h1>{item.name}</h1>
        <img
          src={item.image}
          className="img-fluid"
          style={{ height: "200px", width: "200px" }}
        />
      </div>
      <div className="flex-container d-flex">
        <div className="w-100 m-1">
          <p>variants</p>
          <select
            className="form-control"
            style={{ width: "100px" }}
            value={variant}
            onChange={(e) => setvariant(e.target.value)}
          >
            {item.variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
        <div className="w-100 m-1">
          <p>quantity</p>
          <select
            className="form-control"
            style={{ width: "100px", marginRight: "800px",marginLeft:'100px'}}
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
        <div className="m-1 w-100">
          <p>Price : {price} LKR</p>
        </div>
      <div className="flex-container">
        <div className="m-1 w-100" style={{justifyContent:"space-between"}}>
          <button className="btn" onClick={addtocart}>
            Add to cart
          </button>
          <button className="btn" style={{marginLeft:'5px'}} onClick={() => addToWishList(item._id)}>
           Add to wishlist
          </button>
        </div>
        <div></div>
      </div>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>dress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src="https://www.pinterest.com/pin/672936369351998871/"
              className="img-fluid"
              style={{ height: "400px", width: "400px" }}
            />
            <p>dresssssssss</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
