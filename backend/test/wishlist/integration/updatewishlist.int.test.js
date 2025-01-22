const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Wishlist = require("../../../models/wishlist");

const mongoURL =
  process.env.testDBURL;

describe("PUT /api/wishlist - Integration Test", function () {
  let testWishlist;

  before(async function () {
    this.timeout(15000);
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    await Wishlist.deleteMany({});

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

  after(async function () {
    await Wishlist.deleteMany({});
    await mongoose.disconnect();
  });

  it("should update a wishlist successfully and return 200", async function () {
    const updatedItem = {
      item: testWishlist.items[0].item.toString(),
      quantity: 1,
      notes: "Updated note",
      rating: 4,
      isPurchased: true,
    };

    const response = await request(server)
      .patch(`/api/wishlist/${testWishlist._id}`)
      .send({ items: [updatedItem] });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      "message",
      "Wishlist updated successfully"
    );
    expect(response.body.wishlist).to.be.an("object");
    expect(response.body.wishlist.items[0]).to.include({
      notes: "Updated note",
      quantity: 2,
      rating: 4,
      isPurchased: true,
    });
  });
});
