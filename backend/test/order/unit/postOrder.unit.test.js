const mongoose = require("mongoose");
const Item = require("../../../models/item");
const { postOrder } = require("../../../controllers/customercontroller");

describe("POST /api/orders - Create New Item Order", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: "Custom T-shirt",
        prices: { small: 10, medium: 12, large: 15 },
        variants: ["red", "blue", "green"],
        description: "A custom t-shirt for the customer.",
        targetmarket: "Fashion",
        category: "Apparel",
        collection: "Spring Collection",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new item and return status 201", async () => {
    const mockSave = jest.fn().mockResolvedValue(req.body);
    Item.prototype.save = mockSave;

    await postOrder(req, res);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("should return status 400 if there is an error in saving the item", async () => {
    const mockSave = jest
      .fn()
      .mockRejectedValue(new Error("Error saving item"));
    Item.prototype.save = mockSave;

    await postOrder(req, res);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(Error) });
  });
});
