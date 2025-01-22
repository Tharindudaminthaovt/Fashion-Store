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

describe("POST /api/tailors/create-post - Integration Test", function () {
  afterEach(async () => {
    await Tailor.deleteMany({});
  });
  it("should create a new tailor post successfully and return 201", async function () {
    const newPost = {
      name: "Jane Smith",
      image: "www.image.com",
      email: "test1@gmail.com",
      category: "Dresses",
      description: "for testing",
    };

    const response = await request(server)
      .post("/api/tailors/create-post")
      .send(newPost);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("post");
    expect(response.body.post).to.include({
      name: "Jane Smith",
      image: "www.image.com",
      email: "test1@gmail.com",
      category: "Dresses",
      description: "for testing",
    });

    const createdTailor = await Tailor.findById(response.body.post._id);
    expect(createdTailor).to.not.be.null;
    expect(createdTailor.name).to.equal("Jane Smith");
    expect(createdTailor.category).to.equal("Dresses");
  });
});
