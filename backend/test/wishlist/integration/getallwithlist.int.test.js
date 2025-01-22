const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server");
const Wishlist = require("../../../models/wishlist");
const { expect } = require("chai");
const sinon = require("sinon");

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

describe("GET /api/wishlist/getallwishlists - Integration Test", function () {
  beforeEach(async function () {
    await Wishlist.insertMany([
      {
        wishlist: new mongoose.Types.ObjectId().toHexString(),
        user: new mongoose.Types.ObjectId().toHexString(),
        items: [
          {
            item: new mongoose.Types.ObjectId().toHexString(),
            quantity: 1,
            notes: "Test note",
            rating: 5,
          },
        ],
        createdAt: new Date(),
      },
      {
        wishlist: new mongoose.Types.ObjectId().toHexString(),
        user: new mongoose.Types.ObjectId(),
        items: [
          {
            item: new mongoose.Types.ObjectId(),
            quantity: 2,
            notes: "Another test note",
            rating: 4,
          },
        ],
        createdAt: new Date(),
      },
    ]);
  });

  afterEach(async function () {
    await Wishlist.deleteMany({});
  });

  it("should fetch all wishlists and return 200", async function () {
    const response = await request(server).get("/api/wishlist/getallwishlists");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.length(2);
    expect(response.body[0]).to.include.keys("user", "items", "createdAt");
  });
});
