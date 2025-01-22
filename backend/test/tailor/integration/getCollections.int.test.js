const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Tailor = require("../../../models/tailor");

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
  await Tailor.deleteMany({}); // Clear the database before running tests
});

after(async function () {
  await mongoose.disconnect(); // Disconnect the database after tests
});

describe("GET /api/tailor/collection - Integration Test", function () {
  beforeEach(async function () {
    // Seed the database with mock data
    await Tailor.insertMany([
      {
        name: "John Doe",
        image: "www.image.com",
        email: "test@gmail.com",
        category: "Suits",
        description: "for testing",
      },
      {
        name: "Jane Smith",
        image: "www.image.com",
        email: "test1@gmail.com",
        category: "Dresses",
        description: "for testing",
      },
    ]);
  });

  afterEach(async function () {
    await Tailor.deleteMany({}); // Clean up after each test
  });

  it("should return 404 if no collections are found", async function () {
    // Clear the database to simulate no collections
    await Tailor.deleteMany({});

    const response = await request(server).get("/api/tailor/collections");

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({});
  });
});
