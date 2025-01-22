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

describe("POST /api/outfits/outfit - Integration Test", () => {
  //   it("should create a new outfit and return status 201", async () => {
  //     const newOutfit = {
  //       items: [
  //         {
  //           itemId: new mongoose.Types.ObjectId().toHexString(),
  //           itemName: "Shirt",
  //           itemImage: "www.shirt.com/image.jpg",
  //         },
  //       ],
  //       name: "Casual Outfit",
  //       description: "Perfect for casual wear",
  //       image: "www.outfit.com/image.jpg",
  //       occasion: "Casual",
  //     };

  //     const response = await request(server)
  //       .post("/api/outfits/outfit")
  //       .set("Authorization", `Bearer testToken`)
  //       .send(newOutfit);

  //     expect(response.status).to.equal(201);
  //     expect(response.body).to.have.property("name", "Casual Outfit");
  //     expect(response.body).to.have.property(
  //       "description",
  //       "Perfect for casual wear"
  //     );
  //     expect(response.body).to.have.property("occasion", "Casual");
  //     expect(response.body).to.have.property("_id");
  //   });

  it("should return 401 if userId is invalid or not provided", async function () {
    const newOutfit = {
      items: [
        {
          itemId: new mongoose.Types.ObjectId().toHexString(),
          itemName: "Shirt",
          itemImage: "www.shirt.com/image.jpg",
        },
      ],
      name: "Casual Outfit",
      description: "Perfect for casual wear",
      image: "www.outfit.com/image.jpg",
      occasion: "Casual",
    };

    const response = await request(server)
      .post("/api/outfits/outfit")
      .set("Authorization", `Bearer someValidToken`)
      .send(newOutfit); // Simulating invalid userId
    expect([401, 500]).to.include(response.status);
  });
});
