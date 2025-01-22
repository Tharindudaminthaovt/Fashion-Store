const express = require("express");
const router = express.Router();
const { paymentNotify, paymentTest } = require("../controllers/statuscodecont");

router.post("/payment/notify", paymentNotify);

router.post("/payment/test", paymentTest);

module.exports = router;
