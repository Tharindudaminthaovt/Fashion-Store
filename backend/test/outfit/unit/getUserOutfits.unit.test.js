const mongoose = require("mongoose");
const Outfit = require("../../../models/outfits");
const { getUserOutfits } = require("../../../controllers/outfitcontroller");

describe("GET /api/outfits - getUserOutfits", () => {
  let req, res;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer someValidToken",
      },
      userId: new mongoose.Types.ObjectId().toHexString(), // Mock user ID from token
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return user outfits with status 200", async () => {
    const mockOutfits = [
      {
        user: req.userId,
        items: [
          {
            itemId: new mongoose.Types.ObjectId().toHexString(),
            itemName: "Shirt",
            itemImage: "shirt.jpg",
          },
        ],
        name: "Casual Outfit",
        occasion: "Casual",
        createdAt: new Date(),
      },
    ];

    jest.spyOn(Outfit, "find").mockResolvedValue(mockOutfits);

    await getUserOutfits(req, res);

    expect(Outfit.find).toHaveBeenCalledWith({ user: req.userId });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockOutfits);
  });

  test("should return 400 if userId is missing or invalid", async () => {
    req.userId = null; // Simulate missing userId

    await getUserOutfits(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found or invalid token",
    });
  });

  test("should handle errors and return 500", async () => {
    const errorMessage = "Database error";
    jest.spyOn(Outfit, "find").mockRejectedValue(new Error(errorMessage));

    await getUserOutfits(req, res);

    expect(Outfit.find).toHaveBeenCalledWith({ user: req.userId });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error fetching outfits",
      error: errorMessage,
    });
  });
});
