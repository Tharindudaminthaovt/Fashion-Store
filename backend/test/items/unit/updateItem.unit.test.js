const Item = require("../../../models/item");
const { updateItem } = require("../../../controllers/itemcont");

describe("PATCH /items/:id - Update item", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "507f1f77bcf86cd799439011" },
      body: { name: "Updated Item" },
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

  test("should update item and return 200", async () => {
    const mockUpdatedItem = {
      _id: req.params.id,
      name: "Updated Item",
      variants: [],
      prices: {},
      category: "",
      image: "",
      description: "",
      collection: "",
      targetmarket: "",
      rating: 0,
    };

    jest.spyOn(Item, "findByIdAndUpdate").mockResolvedValue(mockUpdatedItem);

    await updateItem(req, res);

    expect(Item.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    expect(req.io.emit).toHaveBeenCalledWith("item updated", mockUpdatedItem);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ updatedItem: mockUpdatedItem });
  });

  test("should return 404 if item not found", async () => {
    jest.spyOn(Item, "findByIdAndUpdate").mockResolvedValue(null);

    await updateItem(req, res);

    expect(Item.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Item not found",
    });
  });
});
