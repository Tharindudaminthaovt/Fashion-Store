const express = require("express");
const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Item = require("../../../models/item");

const mongoURL = process.env.testDBURL;

describe("PATCH /api/items/:id - Integration Test", function () {
  let testItem;

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
    this.timeout(15000);
    await mongoose.connection.close();
  });

  beforeEach(async function () {
    this.timeout(15000);
    await Item.deleteMany({});
    // Seed the database with a test item
    testItem = await Item.create({
      name: "Original Item",
      variants: ["16GB RAM", "512GB SSD"],
      prices: { basePrice: 1000 },
      category: "electronics",
      image: "item.jpg",
      description: "A test item",
      collection: "Test Collection",
      targetmarket: "Test Market",
      rating: 4.0,
    });
  });

  afterEach(async function () {
    await Item.deleteMany({});
  });

  it("should update an item successfully and return 200", async function () {
    const updatedData = {
      name: "Updated Item",
      category: "updated-electronics",
      rating: 4.5,
    };
    const response = await request(server)
      .patch(`/api/items/items/${testItem._id}`)
      .send(updatedData);
    expect(response.status).to.equal(200);
    expect(response.body.updatedItem).to.be.an("object");
    expect(response.body.updatedItem).to.include(updatedData);
    expect(response.body.updatedItem._id).to.equal(testItem._id.toString());
  });
});
