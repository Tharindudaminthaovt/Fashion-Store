const mongoose = require("mongoose");
const Customer = require("../../../models/customer");
const {
  updateCustomerOrder,
} = require("../../../controllers/customercontroller");

describe("PUT /api/orders/:id - Update Customer Order", () => {
  let req, res, mockOrder;

  beforeEach(() => {
    req = {
      userId: new mongoose.Types.ObjectId().toHexString(), // Simulate logged-in user ID
      params: { id: new mongoose.Types.ObjectId().toHexString() }, // Simulate order ID
      body: {
        order: "Updated Order",
        description: "Updated custom order description",
      },
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

  test("should update the customer order and return 200", async () => {
    // Mock finding and updating the order in the database
    jest.spyOn(Customer, "findOneAndUpdate").mockResolvedValue({
      ...mockOrder,
      ...req.body,
    });

    await updateCustomerOrder(req, res);

    expect(Customer.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(Customer.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: req.params.id,
      userId: req.userId,
      order: "Updated Order",
      description: "Updated custom order description",
      image: "https://example.com/order.jpg",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      tailorId: mockOrder.tailorId,
      accepted: false,
    });
  });

  test("should return 404 if order not found or user does not have permission", async () => {
    // Mock the scenario where no order is found or the user does not have permission
    jest.spyOn(Customer, "findOneAndUpdate").mockResolvedValue(null);

    await updateCustomerOrder(req, res);

    expect(Customer.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Customer order not found or you do not have permission to update",
    });
  });
});
