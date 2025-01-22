const express = require("express");
const { 
  getUserOutfits, 
  createOutfit, 
  getOutfitById, 
  updateOutfit, 
  deleteOutfit 
} = require("../controllers/outfitcontroller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Outfit routes
router.get("/outfit", verifyToken, getUserOutfits); // Get outfits for the logged-in user
router.post("/outfit", verifyToken, createOutfit); // Create a new outfit
router.get("/outfit/:id", verifyToken, getOutfitById); // Get a single outfit by ID
router.put("/outfit/:id", verifyToken, updateOutfit); // Update an outfit by ID
router.delete("/outfit/:id", verifyToken, deleteOutfit); // Delete an outfit by ID

module.exports = router;