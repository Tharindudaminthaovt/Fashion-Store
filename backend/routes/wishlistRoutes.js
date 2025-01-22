const express = require("express");
const router = express.Router();
const {
  createWishlistItem,
  getWishlistByUser,
  updateWishlist,
  getAllWishlists,
  deleteWishlist,
  deleteWishlistItem,
} = require("../controllers/wishlistcont");

//create a new wishlist item
router.post("/addwishlist", createWishlistItem);

//get wishlist items by userId
router.get("/user/:userId", getWishlistByUser);

//update a wishlist
router.patch("/:wishlistId", updateWishlist);

//get all wishlists
router.get("/getallwishlists", getAllWishlists);

router.delete("/deletewishlist/:id", deleteWishlist);

router.patch("/deleteWishlistItem/:wishlistId", deleteWishlistItem);

module.exports = router;
