const mongoose = require("mongoose");
const Wishlist = require("../../../models/wishlist");
const { getAllWishlists } = require("../../../controllers/wishlistcont");

describe("GET api/wishlist/getallwishlists - Unit Test", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should fetch all wishlists and return 200", async () => {
    const mockWishlists = [
      {
        _id: new mongoose.Types.ObjectId().toHexString(),
        wishlist: new mongoose.Types.ObjectId().toHexString(),
        user: new mongoose.Types.ObjectId().toHexString(),
        items: [
          {
            item: new mongoose.Types.ObjectId(),
            quantity: 1,
            notes: "Test note",
            rating: 5,
          },
        ],
        createdAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId().toHexString(),
        wishlist: new mongoose.Types.ObjectId().toHexString(),
        user: new mongoose.Types.ObjectId().toHexString(),
        items: [
          {
            item: new mongoose.Types.ObjectId(),
            quantity: 2,
            notes: "Another note",
            rating: 4,
          },
        ],
        createdAt: new Date(),
      },
    ];

    jest.spyOn(Wishlist, "find").mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockWishlists), // Use mockWishlists directly
    });

    const req = {}; // Mock request object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllWishlists(req, res);

    expect(Wishlist.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should handle error and return 500", async () => {
    const mockError = new Error("Database query failed");

    jest.spyOn(Wishlist, "find").mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(mockError), // Simulate error scenario
    });

    const req = {}; // Mock request object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllWishlists(req, res);

    expect(Wishlist.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
