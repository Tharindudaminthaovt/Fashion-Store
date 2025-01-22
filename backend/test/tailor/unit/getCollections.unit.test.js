const mongoose = require("mongoose");
const Tailor = require("../../../models/tailor");
const { getCollections } = require("../../../controllers/tailorcont");

describe("GET /api/tailor/collections - getCollections", () => {
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

  test("should return a list of collection names with status 200", async () => {
    const mockCollections = ["Summer", "Winter", "Formal"];

    jest.spyOn(Tailor, "distinct").mockResolvedValue(mockCollections);

    await getCollections(req, res);

    expect(Tailor.distinct).toHaveBeenCalledWith("collection");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCollections);
  });

  test("should return 404 if no collections are found", async () => {
    jest.spyOn(Tailor, "distinct").mockResolvedValue([]);

    await getCollections(req, res);

    expect(Tailor.distinct).toHaveBeenCalledWith("collection");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No collections found" });
  });
});
