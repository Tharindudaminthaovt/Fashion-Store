const mongoose = require("mongoose");
const Customer = require("../../../models/customer");
const {
  getCustomerOrderById,
} = require("../../../controllers/customercontroller");

describe("GET /api/orders/:id - Get Customer Order by ID", () => {
  let req, res, mockOrder;

  beforeEach(() => {
    req = {
      userId: new mongoose.Types.ObjectId().toHexString(),
      params: { id: new mongoose.Types.ObjectId().toHexString() },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockOrder = {
      _id: req.params.id,
      userId: req.userId,
      order: "Order123",
      image: "https://example.com/order.jpg",
      description: "A custom order for the customer.",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      tailorId: new mongoose.Types.ObjectId().toHexString(),
      accepted: false,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return the customer order and status 200 if found", async () => {
    // Mock finding the order in the database
    jest.spyOn(Customer, "findOne").mockResolvedValue(mockOrder);

    await getCustomerOrderById(req, res);

    expect(Customer.findOne).toHaveBeenCalledTimes(1);
    expect(Customer.findOne).toHaveBeenCalledWith({
      _id: req.params.id,
      userId: req.userId,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockOrder);
  });

  test("should return 404 if order not found or user does not have permission", async () => {
    jest.spyOn(Customer, "findOne").mockResolvedValue(null);

    await getCustomerOrderById(req, res);

    expect(Customer.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Customer order not found or you do not have permission",
    });
  });
});
