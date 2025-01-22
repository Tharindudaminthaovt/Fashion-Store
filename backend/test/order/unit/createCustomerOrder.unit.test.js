const mongoose = require("mongoose");
const Customer = require("../../../models/customer");
const {
  createCustomerOrder,
} = require("../../../controllers/customercontroller");

describe("POST /api/orders - Create Customer Order", () => {
  let req, res;

  beforeEach(() => {
    req = {
      userId: new mongoose.Types.ObjectId().toHexString(),
      body: {
        order: "Order123",
        image: "https://example.com/order.jpg",
        description: "A custom order for the customer.",
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        tailorId: new mongoose.Types.ObjectId().toHexString(),
      },
      io: { emit: jest.fn() }, // Mock io.emit if needed for emitting events
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new customer order and return 201", async () => {
    // Mock saving the customer order in the database
    const mockSavedOrder = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      userId: req.userId,
    };

    jest.spyOn(Customer.prototype, "save").mockResolvedValue(mockSavedOrder);

    await createCustomerOrder(req, res);

    expect(Customer.prototype.save).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockSavedOrder);
  });
});
