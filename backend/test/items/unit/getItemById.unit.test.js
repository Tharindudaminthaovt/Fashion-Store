const Item = require("../../../models/item");
const { getItemById } = require("../../../controllers/itemcont");

describe("GET /items/:id - Fetch item by ID", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: "507f1f77bcf86cd799439011" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return item by ID", async () => {
    const mockItem = { _id: req.params.id, name: "Item 1" };
    jest.spyOn(Item, "findById").mockResolvedValue(mockItem);

    await getItemById(req, res);

    expect(Item.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.json).toHaveBeenCalledWith(mockItem);
    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  test("should return 404 if item not found", async () => {
    jest.spyOn(Item, "findById").mockResolvedValue(null);

    await getItemById(req, res);

    expect(Item.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
