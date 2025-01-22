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

describe("DELETE /api/items/:id - Integration Test", function () {
  let testItem;

  beforeEach(async function () {
    await Item.deleteMany({});

    // Create a sample item to delete
    testItem = await Item.create({
      name: "Item to delete",
      variants: ["Small", "Medium"],
      prices: { Small: 10, Medium: 15 },
      category: "Category",
      image: "https://example.com/item.jpg",
      description: "Description",
      collection: "Collection",
      targetmarket: "Target Market",
      rating: 4.5,
    });
  });

  afterEach(async function () {
    await Item.deleteMany({});
  });

  it("should delete an item", async function () {
    const response = await request(server).delete(
      `/api/items/items/${testItem._id}`
    );

    expect(response.status).to.equal(500);

    // Ensure the item is deleted from the database
    const deletedItem = await Item.findById(testItem._id);
    expect(deletedItem).to.be.null;
  });
});
