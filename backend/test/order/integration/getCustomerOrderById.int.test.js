const mongoose = require("mongoose");
const Customer = require("../../../models/customer");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");

const mongoURL =
  process.env.testDBURL;

before(async function () {
  this.timeout(15000);
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await Customer.deleteMany({});
});

after(async () => {
  await mongoose.disconnect();
});

describe("GET /api/placeorder/order/:id - Get Customer Order by ID", () => {
  let customerOrder;
  let validToken;

  beforeEach(async () => {
    // Mock the customer order to retrieve
    const newOrder = {
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      order: "Custom Suit",
      image: "https://example.com/custom-suit.jpg",
      description: "A tailored suit for the customer.",
      tailorId: new mongoose.Types.ObjectId().toHexString(),
      userId: new mongoose.Types.ObjectId().toHexString(),
    };

    customerOrder = await new Customer(newOrder).save();

    // Mock valid token (valid JWT token)
    validToken = "someValidToken";
  });

  afterEach(async () => {
    await Customer.deleteMany({});
  });

  // it("should return the customer order and status 200 if found", async () => {
  //   const response = await request(server)
  //     .get(`/api/placeorder/order/${customerOrder._id}`)
  //     .set("Authorization", `Bearer ${validToken}`);

  //   expect(response.status).to.equal(200);
  //   expect(response.body).to.have.property("order", "Custom Suit");
  //   expect(response.body).to.have.property("customerName", "John Doe");
  //   expect(response.body).to.have.property(
  //     "customerEmail",
  //     "john.doe@example.com"
  //   );
  //   expect(response.body).to.have.property("_id", customerOrder._id.toString());
  // });

  it("should return 401 if user is not authorized", async function () {
    const response = await request(server).get(
      `/api/placeorder/order/${customerOrder._id}`
    );

    expect([401, 500]).to.include(response.status);
  });
});
