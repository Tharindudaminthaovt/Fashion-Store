const mongoose = require("mongoose");
const Test = require("../../../models/test");
const { getAllTest } = require("../../../controllers/testcont");

describe("GET /getalltest - fetch all test items", () => {
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
    const mockTestItems = [
      {
        _id: new mongoose.Types.ObjectId(),
        test: "Test 1",
        description: "Description 1",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        test: "Test 2",
        description: "Description 2",
      },
    ];

    jest.spyOn(Test, "find").mockResolvedValue(mockTestItems);

    await getAllTest(req, res);

    expect(Test.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockTestItems);
    expect(res.status).not.toHaveBeenCalledWith(200);
  });

  test("should return 400 if a database error occurs", async () => {
    const error = new Error("Database error");
    jest.spyOn(Test, "find").mockRejectedValue(error);

    await getAllTest(req, res);

    expect(Test.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
