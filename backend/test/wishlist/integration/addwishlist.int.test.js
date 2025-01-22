const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server.js");
const Wishlist = require("../../../models/wishlist");
const sinon = require("sinon");
const { expect } = require("chai");

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
  await mongoose.disconnect();
});

describe("POST /api/wishlist/addwishlist - Integration Test", function () {
  beforeEach(async function () {
    await Wishlist.deleteMany({}); // Ensure a clean state before each test
  });

  afterEach(async function () {
    await Wishlist.deleteMany({}); // Clear the collection after each test
  });

  it("should create a new wishlist item and return 201", async function () {
    const mockWishlist = {
      wishlist: new mongoose.Types.ObjectId().toHexString(),
      user: new mongoose.Types.ObjectId().toHexString(),
      items: [
        {
          item: new mongoose.Types.ObjectId().toHexString(),
          notes: "Note 1",
          quantity: 1,
          rating: 5,
        },
        {
          item: new mongoose.Types.ObjectId().toHexString(),
          notes: "Note 2",
          quantity: 2,
          rating: 4,
        },
      ],
    };

    const response = await request(server)
      .post("/api/wishlist/addwishlist")
      .send(mockWishlist);

    expect(response.status).to.equal(201);
    expect(response.body).to.include.keys("_id", "user", "items", "createdAt");
    expect(response.body.user).to.equal(mockWishlist.user);
    expect(response.body.items).to.be.an("array").that.has.length(2);
    expect(response.body.items[0]).to.include({
      notes: "Note 1",
      quantity: 1,
      rating: 5,
    });
  });
});
