const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server.js");
const Item = require("../../../models/item.js");
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
});

after(async function () {
  await mongoose.disconnect();
});

describe("GET /api/items/searchItems - Integration Test", function () {
  beforeEach(async function () {
    await Item.deleteMany({});
  });

  afterEach(async function () {
    await Item.deleteMany({});
  });

  it("should return items matching the category and status 200", async function () {
    const mockItems = [
      {
        name: "Laptop",
        variants: ["16GB RAM", "512GB SSD"],
        prices: { basePrice: 1000 },
        category: "electronics",
        image: "laptop.jpg",
        description: "A powerful laptop",
        collection: "Tech Collection",
        targetmarket: "Professionals",
        rating: 4.5,
      },
      {
        name: "Laptop no.2",
        variants: ["16GB RAM", "512GB SSD"],
        prices: { basePrice: 1000 },
        category: "laptops",
        image: "laptop.jpg",
        description: "A powerful laptop",
        collection: "Tech Collection",
        targetmarket: "Professionals",
        rating: 4.5,
      },
    ];
    await Item.insertMany(mockItems);

    const response = await request(server)
      .get("/api/items/search-results")
      .query({ category: "electronics" });

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").with.lengthOf(1);
    expect(response.body[0]).to.deep.include({
      name: "Laptop",
      variants: ["16GB RAM", "512GB SSD"],
      prices: { basePrice: 1000 },
      category: "electronics",
      image: "laptop.jpg",
      description: "A powerful laptop",
      collection: "Tech Collection",
      targetmarket: "Professionals",
      rating: 4.5,
    });
  });
});
