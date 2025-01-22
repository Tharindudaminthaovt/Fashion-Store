const mongoose = require("mongoose");
const Wishlist = require("../../../models/wishlist");
const { getWishlistByUser } = require("../../../controllers/wishlistcont");

describe("GET /getWishlistByUser - Fetch wishlist by user ID", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        userId: new mongoose.Types.ObjectId().toHexString(),
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

  test("should fetch wishlist successfully and return 200", async () => {
    const mockWishlist = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      user: req.params.userId,
      items: [
        {
          item: {
            _id: new mongoose.Types.ObjectId().toHexString(),
            name: "Sample Item",
            description: "Sample Description",
          },
          quantity: 1,
          notes: "Sample Note",
        },
      ],
    };

    jest.spyOn(Wishlist, "findOne").mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockWishlist),
    });

    await getWishlistByUser(req, res);

    expect(Wishlist.findOne).toHaveBeenCalledWith({ user: req.params.userId });
    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(mockWishlist);
  });

  test("should return 404 if wishlist is not found", async () => {
    jest.spyOn(Wishlist, "findOne").mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null),
    });

    await getWishlistByUser(req, res);

    expect(Wishlist.findOne).toHaveBeenCalledWith({ user: req.params.userId });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Wishlist not found" });
  });
});
