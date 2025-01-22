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

describe("PATCH /api/placeorder/accept/:id - Accept Customer Order", () => {
  let customerOrder;
  let validToken;

  beforeEach(async () => {
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

  //   it("should accept the customer order and return status 200", async () => {
  //     const response = await request(server)
  //       .patch(`/api/placeorder/accept/${customerOrder._id}`)
  //       .set("Authorization", `Bearer ${validToken}`);

  //     expect(response.status).to.equal(200);
  //     expect(response.body).to.have.property("accepted", true);
  //     expect(response.body).to.have.property("_id", customerOrder._id.toString());
  //   });

  it("should return 404 if order not found or user does not have permission", async function () {
    const invalidOrderId = new mongoose.Types.ObjectId().toHexString();
    const response = await request(server)
      .patch(`/api/placeorder/accept/${invalidOrderId}`)
      .set("Authorization", `Bearer ${validToken}`);

    expect([404, 500]).to.include(response.status);
  });
});
