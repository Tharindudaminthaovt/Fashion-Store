const mongoose = require("mongoose");
const Tailor = require("../../../models/tailor");
const { searchTailors } = require("../../../controllers/tailorcont");

describe("GET /api/tailors/search - searchTailors", () => {
  let req, res;

  beforeEach(() => {
    req = {
      query: {
        category: "suits", // Example category to search for
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

  test("should return categories matching the search query", async () => {
    const mockCategories = ["Suits", "Shirts", "Pants"];

    jest.spyOn(Tailor, "distinct").mockResolvedValue(mockCategories);

    await searchTailors(req, res);

    expect(Tailor.distinct).toHaveBeenCalledWith("category", {
      category: { $regex: req.query.category, $options: "i" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategories);
  });

  test("should handle error and return 500 if an error occurs", async () => {
    const errorMessage = "Database error";
    jest.spyOn(Tailor, "distinct").mockRejectedValue(new Error(errorMessage));

    await searchTailors(req, res);

    expect(Tailor.distinct).toHaveBeenCalledWith("category", {
      category: { $regex: req.query.category, $options: "i" },
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error searching tailors",
      error: errorMessage,
    });
  });
});
