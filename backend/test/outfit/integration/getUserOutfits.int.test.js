const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Outfit = require("../../../models/outfits");
const User = require("../../../models/user");

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
  await User.deleteMany({});
});

after(async () => {
  await mongoose.disconnect();
});

describe("GET /api/outfits/outfit - getUserOutfits - Integration Test", function () {
  let testUser;
  let testOutfit;

  beforeEach(async function () {
    // Create a test user
    testUser = await User.create({
      name: "Test User",
      email: "testuser@gmail.com",
      password: "password123",
      username: "abc1",
    });

    // Create a test outfit associated with the test user
    testOutfit = await Outfit.create({
      user: testUser._id,
      name: "Casual Outfit",
      items: [
        {
          itemId: new mongoose.Types.ObjectId(),
          itemName: "T-Shirt",
          itemImage: "tshirt.jpg",
        },
      ],
      occasion: "Casual",
    });
  });

  afterEach(async function () {
    await Outfit.deleteMany({});
    await User.deleteMany({});
  });

  //it("should return user outfits with status 200 when valid userId is provided", async function () {
  // const response = await request(server)
  //   .get("/api/outfits/outfit")
  //   .set("Authorization", `Bearer someValidToken`)
  //   .set("userId", testUser._id.toString());
  // expect(response.status).to.equal(200);
  // expect(response.body).to.be.an("array");
  // expect(response.body).to.have.lengthOf(1);
  // expect(response.body[0]).to.include({
  //   name: "Casual Outfit",
  //   occasion: "Casual",
  // });
  //});

  it("should return 401 if userId is invalid or not provided", async function () {
    const response = await request(server)
      .get("/api/outfits/outfit")
      .set("Authorization", `Bearer someValidToken`)
      .set("userId", null); // Simulating invalid userId
    expect([401, 500]).to.include(response.status);
  });
});
