const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Wishlist = require("../../../models/wishlist");

const mongoURL =
  process.env.testDBURL;

before(async function () {
  this.timeout(15000); // Extend timeout for initial setup
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await Wishlist.deleteMany({});
});

after(async function () {
  await mongoose.connection.close(); // Ensure proper disconnection
});

describe("DELETE /api/wishlist/deletewishlist/:id - Integration Test", function () {
  let testWishlist;

  beforeEach(async function () {
    testWishlist = await Wishlist.create({
      wishlist: new mongoose.Types.ObjectId().toHexString(),
      user: new mongoose.Types.ObjectId().toHexString(),
      items: [
        {
          item: new mongoose.Types.ObjectId().toHexString(),
          quantity: 1,
          notes: "Initial note",
          rating: 5,
          isPurchased: false,
        },
      ],
    });
  });

  afterEach(async function () {
    await Wishlist.deleteMany({});
  });

  it("should delete a wishlist successfully and return 200", async function () {
    const response = await request(server).delete(
      `/api/wishlist/deletewishlist/${testWishlist._id}`
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      "message",
      "Wishlist order deleted successfully"
    );

    const deletedWishlist = await Wishlist.findById(testWishlist._id);
    expect(deletedWishlist).to.be.null;
  });
});
