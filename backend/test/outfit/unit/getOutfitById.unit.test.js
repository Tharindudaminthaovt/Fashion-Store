const mongoose = require("mongoose");
const Outfit = require("../../../models/outfits");
const { getOutfitById } = require("../../../controllers/outfitcontroller");

describe("getOutfitById", () => {
  let req, res, mockOutfit;

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

    mockOutfit = {
      _id: req.params.id,
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
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the outfit with status 200 and populated items", async () => {
    // Mocking `findById` and chaining `populate`
    const mockQuery = {
      populate: jest.fn().mockReturnThis(), // Mock the populate method
      exec: jest.fn().mockResolvedValue(mockOutfit), // Mock the exec method that resolves the outfit
    };

    jest.spyOn(Outfit, "findById").mockReturnValue(mockQuery);

    await getOutfitById(req, res);

    expect(Outfit.findById).toHaveBeenCalledWith(req.params.id);
    expect(mockQuery.populate).toHaveBeenCalledWith("items.itemId"); // Check if populate was called with the correct argument
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
