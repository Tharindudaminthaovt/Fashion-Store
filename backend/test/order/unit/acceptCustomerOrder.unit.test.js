const mongoose = require("mongoose");
const Customer = require("../../../models/customer");
const {
  acceptCustomerOrder,
} = require("../../../controllers/customercontroller");

describe("PATCH /api/orders/:id/accept - Accept Customer Order", () => {
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

  test("should accept the customer order and return status 200", async () => {
    jest.spyOn(Customer, "findOneAndUpdate").mockResolvedValue({
      ...mockOrder,
      accepted: true,
    });

    await acceptCustomerOrder(req, res);

    expect(Customer.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(Customer.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: req.params.id },
      { accepted: true },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ...mockOrder, accepted: true });
  });

  test("should return 404 if the order is not found or user does not have permission", async () => {
    jest.spyOn(Customer, "findOneAndUpdate").mockResolvedValue(null);

    await acceptCustomerOrder(req, res);

    expect(Customer.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Customer order not found or you do not have permission to update",
    });
  });
});
