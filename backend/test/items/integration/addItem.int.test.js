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

describe("POST /api/items - Integration Test", function () {
  beforeEach(async function () {
    await Item.deleteMany({});
  });

  afterEach(async function () {
    await Item.deleteMany({});
  });

  it("should add a new item and return 201", async function () {
    const mockItem = {
      name: "Classic T-Shirt",
      variants: ["Small", "Medium", "Large"],
      prices: { Small: 10, Medium: 15, Large: 20 },
      category: "Clothing",
      image: "https://example.com/classic-tshirt.jpg",
      description: "A timeless classic for your wardrobe.",
      collection: "Spring 2025",
      targetmarket: "Adults",
      rating: 4.5,
    };

    const response = await request(server)
      .post("/api/items/items")
      .send(mockItem);

    expect(response.status).to.equal(201);
    expect(response.body).to.include.keys(
      "_id",
      "name",
      "variants",
      "prices",
      "category",
      "image",
      "description",
      "targetmarket",
      "rating",
      "__v"
    );
    expect(response.body.name).to.equal(mockItem.name);
    expect(response.body.variants).to.be.an("array").that.includes("Small");
    expect(response.body.prices).to.deep.equal(mockItem.prices);
    expect(response.body.category).to.equal(mockItem.category);
  });
});
