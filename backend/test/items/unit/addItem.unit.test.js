const mongoose = require("mongoose");
const Item = require("../../../models/item");
const { addItem } = require("../../../controllers/itemcont");

describe("POST /items - Add a new item", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: "Classic T-Shirt",
        variants: ["Small", "Medium", "Large"],
        prices: { Small: 10, Medium: 15, Large: 20 },
        category: "Clothing",
        image: "https://example.com/classic-tshirt.jpg",
        description: "A timeless classic for your wardrobe.",
        collection: "Spring 2025",
        targetmarket: "Adults",
        rating: 4.5,
      },
      io: { emit: jest.fn() }, // Mock io.emit
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should add a new item and return 201", async () => {
    jest.spyOn(Item.prototype, "save").mockImplementation(function () {
      this._id = new mongoose.Types.ObjectId();
      return Promise.resolve(this);
    });

    await addItem(req, res);

    expect(Item.prototype.save).toHaveBeenCalledTimes(1);

    expect(req.io.emit).toHaveBeenCalledWith(
      "item created",
      expect.objectContaining({
        _id: expect.any(mongoose.Types.ObjectId),
        name: "Classic T-Shirt",
        variants: ["Small", "Medium", "Large"],
        prices: { Small: 10, Medium: 15, Large: 20 },
        category: "Clothing",
        image: "https://example.com/classic-tshirt.jpg",
        description: "A timeless classic for your wardrobe.",
        targetmarket: "Adults",
        rating: 0,
      })
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: expect.any(mongoose.Types.ObjectId),
        name: "Classic T-Shirt",
        variants: ["Small", "Medium", "Large"],
        prices: { Small: 10, Medium: 15, Large: 20 },
        category: "Clothing",
        image: "https://example.com/classic-tshirt.jpg",
        description: "A timeless classic for your wardrobe.",
        targetmarket: "Adults",
        rating: 0,
      })
    );
  });

  test("should return 400 if validation fails", async () => {
    jest
      .spyOn(Item.prototype, "save")
      .mockRejectedValue(new Error("Validation failed"));

    await addItem(req, res);

    expect(Item.prototype.save).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Bad Request",
      message: "Invalid data provided",
    });
  });
});
