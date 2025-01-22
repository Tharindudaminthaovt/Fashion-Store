const mongoose = require("mongoose");
const Item = require("../../../models/item");
const { getallitems } = require("../../../controllers/itemcont");

describe("GET /items - Fetch all items", () => {
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

  test("should fetch all items and return 200", async () => {
    const mockItems = [
      { _id: new mongoose.Types.ObjectId(), name: "Item 1" },
      { _id: new mongoose.Types.ObjectId(), name: "Item 2" },
    ];

    jest.spyOn(Item, "find").mockResolvedValue(mockItems);

    await getallitems(req, res);

    expect(Item.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockItems);
    expect(res.status).not.toHaveBeenCalledWith(500);
  });

  test("should return 500 if database error occurs", async () => {
    const error = new Error("Database error");
    jest.spyOn(Item, "find").mockRejectedValue(error);

    await getallitems(req, res);

    expect(Item.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
