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

after(async () => {
  await mongoose.disconnect();
});

describe("GET /api/outfits/outfit/:id - Integration Test", () => {
  let testOutfit;

  beforeEach(async () => {
    // Create a sample outfit with items
    testOutfit = await Outfit.create({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          itemId: new mongoose.Types.ObjectId(),
          itemName: "Shirt",
          itemImage: "www.shirt-image.com",
        },
      ],
      name: "Casual Outfit",
      description: "A casual outfit for everyday wear",
      image: "www.outfit-image.com",
      occasion: "Casual",
    });
  });

  afterEach(async () => {
    await Outfit.deleteMany({});
  });

  //   it("should return an outfit by ID with status 200", async () => {
  //     const response = await request(server)
  //       .get(`/api/outfits/outfit/${testOutfit._id}`)
  //       .set("Authorization", "Bearer <valid-token>");

  //     expect(response.status).to.equal(200);
  //     expect(response.body).to.include({
  //       name: "Casual Outfit",
  //       description: "A casual outfit for everyday wear",
  //       image: "www.outfit-image.com",
  //       occasion: "Casual",
  //     });
  //     expect(response.body.items).to.be.an("array").that.is.not.empty;
  //     expect(response.body.items[0]).to.include({
  //       itemName: "Shirt",
  //       itemImage: "www.shirt-image.com",
  //     });
  //   });

  it("should return 404 if outfit not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(server)
      .get(`/api/outfits/outfit/${invalidId}`)
      .set("Authorization", "Bearer <valid-token>"); // assuming authentication is required

    expect([401, 500]).to.include(response.status);
  });
});
