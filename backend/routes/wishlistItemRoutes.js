const express = require("express");
const router = express.Router();
const {
  createWishlistItem,
  getWishlistByUser,
  updateWishlist,
  deleteWishlist,
} = require("../controllers/wishlistitemcont");

//create a new wishlist item
router.post("/addwishlist", createWishlistItem);

//get wishlist items by userId
router.get("/user/:userId", getWishlistByUser);

//update a wishlist
router.patch("/:wishlistId", updateWishlist);

router.delete("/:id", deleteWishlist);

module.exports = router;
