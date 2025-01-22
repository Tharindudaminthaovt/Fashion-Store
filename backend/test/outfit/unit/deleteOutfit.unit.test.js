const mongoose = require("mongoose");
const Outfit = require("../../../models/outfits");
const { deleteOutfit } = require("../../../controllers/outfitcontroller");

describe("DELETE /api/outfit/:id - deleteOutfit", () => {
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

  test("should delete an outfit successfully with status 200", async () => {
    const mockOutfit = {
      _id: req.params.id,
      name: "Casual Outfit",
      items: [
        {
          itemId: new mongoose.Types.ObjectId().toHexString(),
          itemName: "Shirt",
          itemImage: "shirt.jpg",
        },
      ],
    };

    jest.spyOn(Outfit, "findByIdAndDelete").mockResolvedValue(mockOutfit);

    await deleteOutfit(req, res);

    expect(Outfit.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Outfit deleted successfully",
    });
  });

  test("should return 404 if the outfit does not exist", async () => {
    const errorMessage = "Outfit not found";
    jest.spyOn(Outfit, "findByIdAndDelete").mockResolvedValue(null);

    await deleteOutfit(req, res);

    expect(Outfit.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
