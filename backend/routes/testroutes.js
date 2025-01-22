//const cors = require('cors');
//app.use(cors());

const express = require("express");
const router1 = express.Router();

const { getAllTest, createTest } = require("../controllers/testcont");

//console.log('Stock model imported:', Item);

router1.get("/getalltest", getAllTest);

router1.get("/create-item", createTest);

module.exports = router1;
