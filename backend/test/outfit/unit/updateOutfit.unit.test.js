const mongoose = require("mongoose");
const Outfit = require("../../../models/outfits");
const { updateOutfit } = require("../../../controllers/outfitcontroller");

describe("PUT /api/outfit/:id - updateOutfit", () => {
  let req, res;
  let mockOutfit;

  beforeEach(() => {
    req = {
      params: { id: new mongoose.Types.ObjectId().toHexString() },
      body: {
        name: "Updated Outfit Name",
        description: "Updated description for the outfit",
        image: "www.updated-outfit.com/image.jpg",
        occasion: "Formal",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockOutfit = {
      _id: req.params.id,
      name: "Casual Outfit",
      description: "Perfect for casual wear",
      image: "www.outfit.com/image.jpg",
      occasion: "Casual",
      save: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should update an outfit successfully with status 200", async () => {
    // Mocking Outfit.findByIdAndUpdate to resolve with updated outfit
    jest
      .spyOn(Outfit, "findByIdAndUpdate")
      .mockResolvedValue({ ...mockOutfit, ...req.body });

    await updateOutfit(req, res);

    expect(Outfit.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ...mockOutfit, ...req.body });
  });

  test("should return 404 if outfit is not found", async () => {
    // Mocking Outfit.findByIdAndUpdate to return null, simulating not found
    jest.spyOn(Outfit, "findByIdAndUpdate").mockResolvedValue(null);

    await updateOutfit(req, res);

    expect(Outfit.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Outfit not found" });
  });

  test("should return 500 if there is an error updating the outfit", async () => {
    const errorMessage = "Database error";
    jest
      .spyOn(Outfit, "findByIdAndUpdate")
      .mockRejectedValue(new Error(errorMessage));

    await updateOutfit(req, res);

    expect(Outfit.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error updating outfit",
      error: errorMessage,
    });
  });
});
