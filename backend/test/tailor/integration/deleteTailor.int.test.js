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

describe("DELETE /api/tailors/deleteTailor/:id - Integration Test", function () {
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

  it("should successfully delete a tailor and return a success message", async function () {
    const response = await request(server).delete(
      `/api/tailors/deleteTailor/${tailor._id}`
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: "Tailor deleted successfully",
    });

    // Verify that the tailor is deleted from the database
    const deletedTailor = await Tailor.findById(tailor._id);
    expect(deletedTailor).to.be.null;
  });
});
