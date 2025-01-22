const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutuscontroller'); // Adjust the path as needed

// route to create a new About Us entry
router.post('/about-us', aboutUsController.createAboutUs);

// route to get all About Us entries
router.get('/about-us', aboutUsController.getAllAboutUs);

// route to get a single About Us entry by ID
router.get('/about-us/:id', aboutUsController.getAboutUsById);

// route to update an About Us entry
router.put('/about-us/:id', aboutUsController.updateAboutUs);

// route to delete an About Us entry
router.delete('/about-us/:id', aboutUsController.deleteAboutUs);

module.exports = router;