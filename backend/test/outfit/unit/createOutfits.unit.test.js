const mongoose = require("mongoose");
const Outfit = require("../../../models/outfits");
const { createOutfit } = require("../../../controllers/outfitcontroller");

describe("POST /api/outfit - createOutfit", () => {
  let req, res;

  beforeEach(() => {
    req = {
      userId: new mongoose.Types.ObjectId().toHexString(),
      body: {
        items: [
          {
            itemId: new mongoose.Types.ObjectId().toHexString(),
            itemName: "Shirt",
            itemImage: "www.shirt.com/image.jpg",
          },
        ],
        name: "Casual Outfit",
        description: "Perfect for casual wear",
        image: "www.outfit.com/image.jpg",
        occasion: "Casual",
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

  test("should create a new outfit successfully with status 201", async () => {
    const mockOutfit = {
      ...req.body,
      user: req.userId,
      _id: new mongoose.Types.ObjectId(),
    };

    jest.spyOn(Outfit.prototype, "save").mockResolvedValue(mockOutfit);

    await createOutfit(req, res);

    expect(Outfit.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockOutfit);
  });

  test("should return 500 if there is an error creating the outfit", async () => {
    const errorMessage = "Database error";
    jest
      .spyOn(Outfit.prototype, "save")
      .mockRejectedValue(new Error(errorMessage));

    await createOutfit(req, res);

    expect(Outfit.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error creating outfit",
      error: errorMessage,
    });
  });
});
