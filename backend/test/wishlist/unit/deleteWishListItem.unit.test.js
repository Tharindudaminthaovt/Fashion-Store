const mongoose = require("mongoose");
const Wishlist = require("../../../models/wishlist");
const { deleteWishlistItem } = require("../../../controllers/wishlistcont");

describe("DELETE /api/wishlist/:wishlistId/item - Delete an item from a wishlist", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        wishlistId: new mongoose.Types.ObjectId().toHexString(),
      },
      body: {
        removeItemId: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should delete an item from the wishlist and return 200", async () => {
    const existingWishlist = {
      _id: req.params.wishlistId,
      items: [
        {
          item: req.body.removeItemId,
          quantity: 1,
          notes: "Sample note",
          rating: 5,
        },
      ],
      save: jest.fn().mockResolvedValue(),
    };

    jest.spyOn(Wishlist, "findById").mockResolvedValue(existingWishlist);

    await deleteWishlistItem(req, res);

    expect(Wishlist.findById).toHaveBeenCalledWith(req.params.wishlistId);
    expect(existingWishlist.items.length).toBe(0); // Ensure item is removed
    expect(existingWishlist.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "Wishlist item deleted successfully",
      wishlist: existingWishlist,
    });
  });

  test("should return 404 if item is not found in the wishlist", async () => {
    const existingWishlist = {
      _id: req.params.wishlistId,
      items: [
        {
          item: new mongoose.Types.ObjectId().toHexString(), // Different ID
          quantity: 1,
          notes: "Sample note",
          rating: 5,
        },
      ],
      save: jest.fn().mockResolvedValue(),
    };

    jest.spyOn(Wishlist, "findById").mockResolvedValue(existingWishlist);

    await deleteWishlistItem(req, res);

    expect(Wishlist.findById).toHaveBeenCalledWith(req.params.wishlistId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Item not found in wishlist",
    });
  });
});
