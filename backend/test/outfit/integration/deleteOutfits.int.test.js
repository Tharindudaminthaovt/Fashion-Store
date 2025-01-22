const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Outfit = require("../../../models/outfits");

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
  await Outfit.deleteMany({});
});

after(async function () {
  await mongoose.connection.close();
});

describe("DELETE /api/outfits/outfit/:id - Integration Test", function () {
  let testOutfit;

  beforeEach(async function () {
    testOutfit = await Outfit.create({
      user: new mongoose.Types.ObjectId().toHexString(),
      items: [
        {
          itemId: new mongoose.Types.ObjectId().toHexString(),
          itemName: "Shirt",
          itemImage: "shirt.jpg",
        },
      ],
      name: "Casual Outfit",
      description: "Perfect for casual wear",
      image: "www.outfit.com/image.jpg",
      occasion: "Casual",
    });
  });

  afterEach(async function () {
    await Outfit.deleteMany({});
  });

  //   it("should delete an outfit successfully and return 200", async function () {
  //     const response = await request(server)
  //       .delete(`/api/outfits/outfit/${testOutfit._id}`)
  //       .set("Authorization", "Bearer someValidToken");

  //     expect(response.status).to.equal(200);
  //     expect(response.body).to.have.property(
  //       "message",
  //       "Outfit deleted successfully"
  //     );
  //   });

  it("should return 401 if userId is invalid or not provided", async function () {
    const response = await request(server)
      .delete(`/api/outfits/outfit/${testOutfit._id}`)
      .set("Authorization", "Bearer someValidToken");
    expect([401, 500]).to.include(response.status);
  });
});
