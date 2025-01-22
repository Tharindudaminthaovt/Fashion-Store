const mongoose = require("mongoose");
const Wishlist = require("../../../models/wishlist");
const { deleteWishlist } = require("../../../controllers/wishlistcont");

describe("DELETE /api/wishlist/:id - Delete a wishlist", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
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

  test("should delete wishlist successfully and return 200", async () => {
    const deletedWishlist = {
      _id: req.params.id,
      user: new mongoose.Types.ObjectId().toHexString(),
      items: [],
    };

    jest
      .spyOn(Wishlist, "findByIdAndDelete")
      .mockResolvedValue(deletedWishlist);

    await deleteWishlist(req, res);

    expect(Wishlist.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Wishlist order deleted successfully",
    });
  });

  test("should return 404 if wishlist not found", async () => {
    jest.spyOn(Wishlist, "findByIdAndDelete").mockResolvedValue(null);

    await deleteWishlist(req, res);

    expect(Wishlist.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Wishlist order not found",
    });
  });

  test("should return 500 if there is an error", async () => {
    const errorMessage = "Database error";

    jest
      .spyOn(Wishlist, "findByIdAndDelete")
      .mockRejectedValue(new Error(errorMessage));

    await deleteWishlist(req, res);

    expect(Wishlist.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error deleting Wishlist order",
      error: errorMessage,
    });
  });
});
