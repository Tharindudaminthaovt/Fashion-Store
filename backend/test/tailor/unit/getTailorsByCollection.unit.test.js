const mongoose = require("mongoose");
const Tailor = require("../../../models/tailor");
const { getTailorsByCollection } = require("../../../controllers/tailorcont");

describe("GET /api/tailors/collection/:name - getTailorsByCollection", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        name: "Summer",
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

  test("should return tailors for the given collection with status 200", async () => {
    const mockTailors = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "John Doe",
        category: "Summer",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Jane Smith",
        category: "Summer",
      },
    ];

    jest.spyOn(Tailor, "find").mockResolvedValue(mockTailors);

    await getTailorsByCollection(req, res);

    expect(Tailor.find).toHaveBeenCalledWith({ category: req.params.name });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTailors);
  });

  test("should return 404 if no tailors are found for the given collection", async () => {
    jest.spyOn(Tailor, "find").mockResolvedValue([]);

    await getTailorsByCollection(req, res);

    expect(Tailor.find).toHaveBeenCalledWith({ category: req.params.name });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "No tailors found for this collection",
    });
  });
});
