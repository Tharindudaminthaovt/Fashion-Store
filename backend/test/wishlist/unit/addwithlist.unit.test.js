const mongoose = require("mongoose");
const Wishlist = require("../../../models/wishlist");
const { createWishlistItem } = require("../../../controllers/wishlistcont");

describe("POST /createWishlistItem - create a new wishlist item", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        wishlist: new mongoose.Types.ObjectId().toHexString(),
        user: new mongoose.Types.ObjectId().toHexString(),
        items: [
          {
            item: new mongoose.Types.ObjectId().toHexString(),
            notes: "Note 1",
            quantity: 1,
            rating: 5,
          },
          {
            item: new mongoose.Types.ObjectId().toHexString(),
            notes: "Note 2",
            quantity: 2,
            rating: 4,
          },
        ],
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

  test("should create a new wishlist item and return 201", async () => {
    const mockSavedWishlist = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      wishList: req.body.wishlist,
      user: req.body.user,
      items: req.body.items,
      createdAt: new Date(),
    };

    jest.spyOn(Wishlist.prototype, "save").mockResolvedValue(mockSavedWishlist);

    await createWishlistItem(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: mockSavedWishlist._id,
      wishList: mockSavedWishlist.wishList,
      user: mockSavedWishlist.user,
      items: mockSavedWishlist.items,
      createdAt: mockSavedWishlist.createdAt,
    });
  });

  test("should return 400 if user is missing or items are invalid", async () => {
    req.body.user = null;
    req.body.items = [];

    await createWishlistItem(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Bad Request",
      message: "Invalid data provided",
    });
  });
});
