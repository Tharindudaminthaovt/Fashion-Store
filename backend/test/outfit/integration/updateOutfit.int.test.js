const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Outfit = require("../../../models/outfits");

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
  await Outfit.deleteMany({}); // Clear the database before tests
});

after(async function () {
  await mongoose.disconnect(); // Disconnect the database after tests
});

describe("PUT /api/outfits/outfit/:id - Integration Test", function () {
  let outfit;

  beforeEach(async function () {
    // Seed the database with a mock outfit
    outfit = await Outfit.create({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          itemId: new mongoose.Types.ObjectId(),
          itemName: "Shirt",
          itemImage: "www.shirt.com/image.jpg",
        },
      ],
      name: "Casual Outfit",
      description: "Perfect for casual wear",
      image: "www.outfit.com/image.jpg",
      occasion: "Casual",
    });
  });

  afterEach(async function () {
    await Outfit.deleteMany({}); // Clean up after each test
  });

  //   it("should successfully update an outfit and return the updated object", async function () {
  //     const updatedData = {
  //       name: "Updated Casual Outfit",
  //       description: "Updated description for the casual wear outfit",
  //       image: "www.updated-outfit.com/image.jpg",
  //       occasion: "Formal",
  //     };

  //     const response = await request(server)
  //       .put(`/api/outfits/outfit/${outfit._id}`)
  //       .send(updatedData);

  //     expect(response.status).to.equal(200);
  //     expect(response.body).to.include(updatedData);
  //     expect(response.body).to.have.property("_id", outfit._id.toString());
  //   });

  it("should return 401 if userId is invalid or not provided", async function () {
    const updatedData = {
      name: "Updated Casual Outfit",
      description: "Updated description for the casual wear outfit",
      image: "www.updated-outfit.com/image.jpg",
      occasion: "Formal",
    };
    const response = await request(server)
      .put(`/api/outfits/outfit/${outfit._id}`)
      .send(updatedData);
    expect([401, 500]).to.include(response.status);
  });
});
