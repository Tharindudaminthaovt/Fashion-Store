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
  await Tailor.deleteMany({});
});

after(async function () {
  await mongoose.disconnect();
});

describe("GET /api/tailors/search-results - Integration Test", function () {
  let testTailors;

  beforeEach(async function () {
    // Create sample tailors
    testTailors = await Tailor.create({
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

  it("should return categories matching the search query", async function () {
    const response = await request(server)
      .get("/api/tailors/search-results")
      .query({ category: "Suits" });

    expect(response.status).to.equal(200);
  });
});
