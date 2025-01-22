const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Tailor = require("../../../models/tailor");

const mongoURL =
  process.env.testDBURL;

before(async function () {
  this.timeout(15000); // Increase timeout for database connection
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await Tailor.deleteMany({});
});

after(async function () {
  await mongoose.disconnect();
});

describe("GET /api/tailors/tailor/:id - Integration Test", function () {
  let testTailor;

  beforeEach(async function () {
    testTailor = await Tailor.create({
      name: "John Doe",
      image: "www.image.com",
      email: "test@gmail.com",
      category: "Suits",
      description: "for testing",
    });
  });

  afterEach(async function () {
    await Tailor.deleteMany({});
  });

  it("should return the tailor successfully with status 200", async function () {
    const response = await request(server).get(
      `/api/tailors/tailor/${testTailor._id}`
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.include({
      _id: testTailor._id.toString(),
      name: "John Doe",
      image: "www.image.com",
      email: "test@gmail.com",
      category: "Suits",
      description: "for testing",
    });
  });
});
