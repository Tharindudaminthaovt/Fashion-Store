const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server");
const Wishlist = require("../../../models/wishlist");
const { expect } = require("chai");
const User = require("../../../models/user");
const WishlistItem = require("../../../models/wishlistitem");

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
  await User.deleteMany({});
  await WishlistItem.deleteMany({});
  await Wishlist.deleteMany({});
});

after(async function () {
  await mongoose.disconnect();
});

describe("GET /wishlist/:userId - Integration Test", function () {
  let userId;
  let wishlistId;
  let wishlistitemId;

  beforeEach(async function () {
    // Create a sample wishlist before each test
    const user = new User({
      email: "test@gmail.com",
      password: "123",
      username: "test",
    });
    const savedUser = await user.save();
    userId = savedUser._id;

    const item = new WishlistItem({
      user: userId,
      notes: "Note 2",
      image: "abc.img",
      name: "abc2",
    });

    const savedItem = await item.save();
    wishlistitemId = savedItem._id;

    const newWishlist = new Wishlist({
      wishlist: new mongoose.Types.ObjectId(`${wishlistitemId}`),
      user: new mongoose.Types.ObjectId(`${userId}`),
      items: [
        {
          item: new mongoose.Types.ObjectId().toHexString(),
          quantity: 2,
          notes: "Test note",
        },
      ],
    });
    const savedWishlist = await newWishlist.save();
    userId = userId.toString();
    wishlistId = savedWishlist._id;
  });

  afterEach(async function () {
    await WishlistItem.deleteMany({});
    await User.deleteMany({});
    await Wishlist.deleteMany({}); // Clear the wishlist collection after each test
  });

  it("should fetch wishlist by user ID and return 200", async function () {
    const response = await request(server)
      .get(`/api/wishlist/user/${userId}`)
      .expect(200);

    expect(response.body).to.have.property("_id").eql(wishlistId.toString());
    expect(response.body).to.have.property("user").eql(userId.toString());
    expect(response.body.items).to.be.an("array").with.lengthOf(1);
    expect(response.body.items[0]).to.include({
      quantity: 2,
      notes: "Test note",
    });
  });
});
