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

after(async () => {
  await mongoose.disconnect();
});

describe("GET /api/tailors/getallTailors - Integration Test", () => {
  beforeEach(async () => {
    await Tailor.create([
      {
        name: "John Doe",
        image: "www.image.com",
        email: "test@gmail.com",
        category: "Suits",
        description: "for testing",
      },
    ]);
  });

  afterEach(async () => {
    await Tailor.deleteMany({});
  });

  it("should return all tailors with status 200", async () => {
    const response = await request(server).get("/api/tailors/getallTailors");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0]).to.include({
      name: "John Doe",
      image: "www.image.com",
      email: "test@gmail.com",
      category: "Suits",
      description: "for testing",
    });
  });
});
