const mongoose = require("mongoose");
const Item = require("../../../models/item");
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
  await Item.deleteMany({});
});

after(async () => {
  await mongoose.disconnect();
});

describe("POST /postorder - Create New Item Order", () => {
  let validToken;

  beforeEach(() => {
    // Mock valid token (valid JWT token)
    validToken = "someValidToken";
  });

  afterEach(async () => {
    await Item.deleteMany({});
  });

  it("should create a new item order and return status 201", async () => {
    const newOrder = {
      name: "Custom T-shirt",
      prices: { small: 10, medium: 12, large: 15 },
      variants: ["red", "blue", "green"],
      description: "A custom t-shirt for the customer.",
      targetmarket: "Fashion",
      category: "Apparel",
      collection: "Spring Collection",
    };

    const response = await request(server)
      .post("/api/placeorder/postorder")
      .set("Authorization", `Bearer ${validToken}`)
      .send(newOrder);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name", "Custom T-shirt");
    expect(response.body).to.have.property("category", "Apparel");
    expect(response.body).to.have.property(
      "description",
      "A custom t-shirt for the customer."
    );
    expect(response.body)
      .to.have.property("prices")
      .that.deep.equals({ small: 10, medium: 12, large: 15 });
  });
});
