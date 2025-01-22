const mongoose = require("mongoose");
const Wishlist = require("../../../models/wishlist");
const { updateWishlist } = require("../../../controllers/wishlistcont");

describe("PATCH /api/wishlist - Update a wishlist", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        wishlistId: new mongoose.Types.ObjectId().toHexString(),
      },
      body: {
        items: [
          {
            item: new mongoose.Types.ObjectId().toHexString(),
            quantity: 3,
            notes: "Updated note",
            rating: 4,
          },
        ],
        addedAt: new Date(),
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

  test("should update wishlist successfully and return 200", async () => {
    const existingWishlist = {
      _id: req.params.wishlistId,
      user: new mongoose.Types.ObjectId().toHexString(),
      items: [
        {
          item: req.body.items[0].item,
          quantity: 1,
          notes: "Old note",
          rating: 5,
          isPurchased: false,
        },
      ],
      save: jest.fn().mockResolvedValue(),
    };

    jest.spyOn(Wishlist, "findById").mockResolvedValue(existingWishlist);

    await updateWishlist(req, res);

    expect(Wishlist.findById).toHaveBeenCalledWith(req.params.wishlistId);
    expect(existingWishlist.save).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "Wishlist updated successfully",
      wishlist: existingWishlist,
    });
  });

  test("should return 404 if wishlist not found", async () => {
    jest.spyOn(Wishlist, "findById").mockResolvedValue(null);

    await updateWishlist(req, res);

    expect(Wishlist.findById).toHaveBeenCalledWith(req.params.wishlistId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Wishlist not found" });
  });
});
