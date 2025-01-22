const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server.js");
const Item = require("../../../models/item");
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
  await Item.deleteMany({});
});

after(async function () {
  await mongoose.disconnect();
});

describe("GET /api/items - Integration Test", function () {
  beforeEach(async function () {
    await Item.deleteMany({});
  });

  afterEach(async function () {
    await Item.deleteMany({});
  });

  it("should fetch all items and return 200", async function () {
    const mockItems = [
      {
        _id: "6778d8f25a1af5188da7fc85",
        name: "Classic T-Shirt",
        variants: ["Small", "Medium", "Large"],
        prices: {
          Small: 10,
          Medium: 15,
          Large: 20,
        },
        category: "Clothing",
        image: "https://example.com/classic-tshirt.jpg",
        description: "A timeless classic for your wardrobe.",
        targetmarket: "Adults",
        rating: 0,
        __v: 0,
      },
      {
        _id: "6778ecc83fb75875351b95c7",
        name: "Classic Denim",
        variants: ["Small", "Medium", "Large"],
        prices: {
          Small: 10,
          Medium: 15,
          Large: 20,
        },
        category: "Clothing",
        image: "https://example.com/classic-tshirt.jpg",
        description: "A timeless classic for your wardrobe.",
        targetmarket: "Adults",
        rating: 0,
        __v: 0,
      },
    ];

    // Insert mock items into the database
    await Item.insertMany(mockItems);

    const response = await request(server).get("/api/items/items");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").that.has.length(2);
    expect(response.body[0]).to.include({ name: "Classic T-Shirt" });
    expect(response.body[1]).to.include({ name: "Classic Denim" });
  });
});
