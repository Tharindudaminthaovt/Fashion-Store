const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Customer = require("../../../models/customer");

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
  await Customer.deleteMany({}); // Ensure the collection is empty before tests
});

after(async () => {
  await mongoose.disconnect();
});

describe("POST api/placeorder/ - Integration Test", () => {
  //   it("should create a new customer order and return status 201", async function () {
  //     const newCustomerOrder = {
  //       order: "Custom Suit",
  //       image: "https://example.com/custom-suit.jpg",
  //       description: "A tailored suit for the customer.",
  //       customerName: "John Doe",
  //       customerEmail: "john.doe@example.com",
  //       tailorId: new mongoose.Types.ObjectId().toHexString(),
  //     };

  //     const response = await request(server)
  //       .post("/api/placeorder")
  //       .set("Authorization", `Bearer someValidToken`) // Ensure to pass a valid token here
  //       .send(newCustomerOrder);

  //     expect(response.status).to.equal(201);
  //     expect(response.body).to.have.property("order", "Custom Suit");
  //     expect(response.body).to.have.property("customerName", "John Doe");
  //     expect(response.body).to.have.property(
  //       "customerEmail",
  //       "john.doe@example.com"
  //     );
  //     expect(response.body).to.have.property("tailorId");
  //     expect(response.body).to.have.property("_id");
  //   });

  it("should return 401 if user is not authorized", async function () {
    const newCustomerOrder = {
      order: "Custom Suit",
      image: "https://example.com/custom-suit.jpg",
      description: "A tailored suit for the customer.",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      tailorId: new mongoose.Types.ObjectId().toHexString(),
    };

    const response = await request(server)
      .post("/api/placeorder")
      .send(newCustomerOrder);

    expect(response.status).to.equal(401); // Unauthorized
  });
});
