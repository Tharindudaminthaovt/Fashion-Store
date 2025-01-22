const Wishlist = require("../models/wishlist");

// Create a new wishlist item

const createWishlistItem = async (req, res) => {
  const { user, items, wishlist } = req.body;

  try {
    if (!user || !wishlist || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid data provided",
      });
    }

    // Create a new Wishlist document
    const newWishlist = new Wishlist({
      user,
      wishlist,
      items: items.map(({ item, notes, quantity, rating, isPurchased }) => ({
        item,
        notes,
        quantity,
        rating,
        isPurchased: isPurchased || false,
      })),
    });

    //save the wishlist
    const savedWishlist = await newWishlist.save();

    //return the saved wishlist with populated items
    res.status(201).json({
      _id: savedWishlist._id,
      wishList: wishlist,
      user: savedWishlist.user,
      items: savedWishlist.items,
      createdAt: savedWishlist.createdAt,
    });
  } catch (error) {
    console.error("Error creating wishlist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all wishlist items for a user
const getWishlistByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("wishlist")
      .populate("items.item") // Populate the 'item' field inside the 'items' array
      .exec();

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
  try {
    const wishlistId = req.params.wishlistId;
    const updateData = req.body;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Merge existing items with updated items
    if (updateData.items) {
      updateData.items.forEach((updatedItem) => {
        const existingItem = wishlist.items.find(
          (item) => item.item.toString() === updatedItem.item
        );
        if (existingItem) {
          // Update the existing item's properties
          existingItem.quantity = existingItem.quantity
            ? existingItem.quantity + 1
            : updatedItem.quantity;
          existingItem.rating = updatedItem.rating || existingItem.rating;
          existingItem.notes = updatedItem.notes || existingItem.notes;
          existingItem.isPurchased =
            updatedItem.isPurchased !== undefined
              ? updatedItem.isPurchased
              : existingItem.isPurchased;
        } else {
          // Add a new item
          wishlist.items.push(updatedItem);
        }
      });
    }

    // Update other fields if provided
    if (updateData.addedAt) {
      wishlist.addedAt = updateData.addedAt;
    }

    await wishlist.save();

    res.json({ message: "Wishlist updated successfully", wishlist });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({})
      .populate("wishlist")
      .populate("items.item")
      .exec();
    console.log("wishlist fetched from DB:", wishlists);
    res.status(200).json(wishlists);
  } catch (error) {
    console.error("Error fetching all wishlists:", error);
    res.status(500).json({ message: "Error fetching Wishlists" });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWishlist = await Wishlist.findByIdAndDelete(id);
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

const deleteWishlistItem = async (req, res) => {
  try {
    const wishlistId = req.params.wishlistId;
    const { removeItemId } = req.body;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (removeItemId) {
      const indexToRemove = wishlist.items.findIndex(
        (item) => item.item.toString() === removeItemId
      );
      if (indexToRemove !== -1) {
        wishlist.items.splice(indexToRemove, 1); // Remove item from the array
      } else {
        return res.status(404).json({ message: "Item not found in wishlist" });
      }
    }

    await wishlist.save();

    res.json({ message: "Wishlist item deleted successfully", wishlist });
  } catch (error) {
    console.error("Error delete wishlist item", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getWishlistByUser,
  createWishlistItem,
  updateWishlist,
  getAllWishlists,
  deleteWishlist,
  deleteWishlistItem,
};
