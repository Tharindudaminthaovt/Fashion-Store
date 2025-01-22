const mongoose = require("mongoose");
const Customer = require("../../../models/customer");
const {
  getAllCustomerOrders,
} = require("../../../controllers/customercontroller");

describe("GET /api/orders - Get All Customer Orders", () => {
  let req, res, mockOrders;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockOrders = [
      {
        _id: new mongoose.Types.ObjectId().toHexString(),
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        order: "Custom Suit",
        image: "https://example.com/suit.jpg",
        description: "A tailored suit for the customer.",
        userId: new mongoose.Types.ObjectId().toHexString(),
        tailorId: new mongoose.Types.ObjectId().toHexString(),
        accepted: false,
      },
      {
        _id: new mongoose.Types.ObjectId().toHexString(),
        customerName: "Jane Smith",
        customerEmail: "jane.smith@example.com",
        order: "Tailored Shirt",
        image: "https://example.com/shirt.jpg",
        description: "A custom shirt for the customer.",
        userId: new mongoose.Types.ObjectId().toHexString(),
        tailorId: new mongoose.Types.ObjectId().toHexString(),
        accepted: true,
      },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return all customer orders and status 200", async () => {
    // Mock fetching the customer orders from the database
    jest.spyOn(Customer, "find").mockResolvedValue(mockOrders);

    await getAllCustomerOrders(req, res);

    expect(Customer.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });

  test("should return 500 if there is an error fetching customer orders", async () => {
    // Mock a database error
    jest.spyOn(Customer, "find").mockRejectedValue(new Error("Database error"));

    await getAllCustomerOrders(req, res);

    expect(Customer.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error fetching customer orders",
      error: "Database error",
    });
  });
});
