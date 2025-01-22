const express = require('express');
const router = express.Router();
const itemController = require('../controllers/currentaboutuscont');

router.post("/set-current", itemController.setCurrentAboutUs); 
router.get("/current", itemController.getCurrentAboutUs); 
module.exports = router;