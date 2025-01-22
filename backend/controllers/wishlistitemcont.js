const WishlistItem = require("../models/wishlistitem");
const Wishlist = require("../models/wishlist");

// Create a new wishlist item

const createWishlistItem = async (req, res) => {
  const { user, image, name, notes } = req.body;

  try {
    if (!user) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid data provided",
      });
    }

    // Create a new Wishlist document
    const newWishlistItem = new WishlistItem({
      user,
      image,
      name,
      notes,
    });

    //save the wishlist
    const savedWishlistItem = await newWishlistItem.save();

    const newWishlist = new Wishlist({
      user,
      wishlist: savedWishlistItem._id,
      items: [],
    });

    //save the wishlist
    await newWishlist.save();

    //return the saved wishlist with populated items
    res.status(201).json({
      _id: savedWishlistItem._id,
      user: savedWishlistItem.user,
      image: savedWishlistItem.image,
      name: savedWishlistItem.name,
      notes: savedWishlistItem.notes,
      createdAt: savedWishlistItem.createdAt,
    });
  } catch (error) {
    console.error("Error creating wishlistitem:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all wishlist items for a user
const getWishlistByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const wishlist = await WishlistItem.find({ user: userId }).exec();

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a wishlist by ID
const updateWishlist = async (req, res) => {
  const wishlistId = req.params.wishlistId;
  const updateData = req.body;

  try {
    const updatedItem = await WishlistItem.findByIdAndUpdate(
      wishlistId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.json({ message: "Wishlist updated successfully", updatedItem });
  } catch (err) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWishlist = await WishlistItem.findByIdAndDelete(id);
    const result = await Wishlist.deleteMany({ wishlist: id });
    if (!deletedWishlist) {
      return res.status(404).json({ message: "Wishlist order not found" });
    }
    res.status(200).json({ message: "Wishlist order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Wishlist order", error: error.message });
  }
};

module.exports = {
  getWishlistByUser,
  createWishlistItem,
  updateWishlist,
  deleteWishlist,
};
