const express = require("express");
const router = express.Router();
const Order = require("../models/payment");
const Review = require("../models/review");
const {
  createCustomerOrder,
  getAllCustomerOrders,
  acceptCustomerOrder,
  updateCustomerOrder,
  getCustomerOrderById,
  postOrder,
} = require("../controllers/customercontroller");
const verifyToken = require("../middleware/verifyToken");

console.log("Stock model imported:", Order);

router.post("/", verifyToken, createCustomerOrder);

router.patch("/:id", verifyToken, updateCustomerOrder);

router.get("/order/:id", verifyToken, getCustomerOrderById);

router.get("/", getAllCustomerOrders);

router.patch("/accept/:id", verifyToken, acceptCustomerOrder);

router.post("/postorder", postOrder);

module.exports = router;
