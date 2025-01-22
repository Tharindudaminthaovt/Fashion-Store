const mongoose = require("mongoose");
const { searchItems } = require("../../../controllers/itemcont");
const Item = require("../../../models/item");

describe("searchItems", () => {
  let req, res;

  beforeEach(() => {
    req = {
      query: {
        category: "electronics",
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

  test("should return items matching the category and status 200", async () => {
    const mockCategories = ["electronics", "electricals"];
    const mockItems = [
      {
        name: "Laptop",
        variants: ["16GB RAM", "512GB SSD"],
        prices: { basePrice: 1000 },
        category: "electronics",
        image: "laptop.jpg",
        description: "A powerful laptop",
        collection: "Tech Collection",
        targetmarket: "Professionals",
        rating: 4.5,
      },
    ];

    jest.spyOn(Item, "distinct").mockResolvedValue(mockCategories);
    jest.spyOn(Item, "find").mockResolvedValue(mockItems);

    await searchItems(req, res);

    expect(Item.distinct).toHaveBeenCalledWith("category", {
      category: { $regex: req.query.category, $options: "i" },
    });
    expect(Item.find).toHaveBeenCalledWith({
      category: { $regex: req.query.category, $options: "i" },
    });
    expect(res.json).toHaveBeenCalledWith(mockItems);
  });

  test("should return 500 if an error occurs", async () => {
    jest.spyOn(Item, "distinct").mockRejectedValue(new Error("Database error"));

    await searchItems(req, res);

    expect(Item.distinct).toHaveBeenCalledWith("category", {
      category: { $regex: req.query.category, $options: "i" },
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
  });
});
