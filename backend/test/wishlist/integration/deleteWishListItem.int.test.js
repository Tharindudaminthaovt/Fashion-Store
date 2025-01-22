const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Wishlist = require("../../../models/wishlist");

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
  await Wishlist.deleteMany({});
});

after(async function () {
  await mongoose.connection.close();
});

describe("DELETE /api/wishlist/deleteWishlistItem/:wishlistId - Integration Test", function () {
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
        },
        {
          item: new mongoose.Types.ObjectId().toHexString(),
          quantity: 2,
          notes: "Another note",
          rating: 4,
        },
      ],
    });
  });

  afterEach(async function () {
    await Wishlist.deleteMany({});
  });

  it("should delete an item from the wishlist and return 200", async function () {
    const itemToRemove = testWishlist.items[0].item.toString();
    const response = await request(server)
      .patch(`/api/wishlist/deleteWishlistItem/${testWishlist._id}`)
      .send({ removeItemId: itemToRemove._id });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      "message",
      "Wishlist item deleted successfully"
    );
    expect(response.body.wishlist).to.be.an("object");
  });
});
