const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Tailor = require("../../../models/tailor");

const mongoURL =
  process.env.testDBURL;

before(async function () {
  this.timeout(15000); // Set a longer timeout for initial setup
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await Tailor.deleteMany({}); // Clear the database before tests
});

after(async function () {
  await mongoose.disconnect(); // Disconnect the database after tests
});

describe("PATCH /api/tailors/updatetailor/:id - Integration Test", function () {
  let tailor;

  beforeEach(async function () {
    // Seed the database with a mock tailor
    tailor = await Tailor.create({
      name: "John Doe",
      image: "www.image.com",
      email: "test@gmail.com",
      category: "Suits",
      description: "for testing",
    });
  });

  afterEach(async function () {
    await Tailor.deleteMany({}); // Clean up after each test
  });

  it("should successfully update a tailor and return the updated object", async function () {
    const updatedData = {
      name: "John Doe",
      image: "www.image.com",
      email: "test@gmail.com",
      category: "Suits",
      description: "for testing",
    };

    const response = await request(server)
      .patch(`/api/tailors/updatetailor/${tailor._id}`)
      .send(updatedData);

    expect(response.status).to.equal(200);
    expect(response.body).to.include(updatedData);
    expect(response.body).to.have.property("_id", tailor._id.toString());
  });

  it("should return 404 if the tailor does not exist", async function () {
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request(server)
      .patch(`/api/tailors/updatetailor/${nonExistentId}`)
      .send({
        name: "John Doe",
        image: "www.image.com",
        email: "test@gmail.com",
        category: "Suits",
        description: "for testing",
      });

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ message: "Tailor not found" });
  });
});
