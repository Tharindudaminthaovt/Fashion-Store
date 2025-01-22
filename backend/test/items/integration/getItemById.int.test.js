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

describe("GET /api/items/:id - Integration Test", function () {
  let mockItem;

  beforeEach(async function () {
    await Item.deleteMany({});
    mockItem = await Item.create({
      name: "Test Item",
      variants: ["Small", "Medium"],
      prices: { Small: 10, Medium: 15 },
      category: "Test Category",
      description: "This is a test item description.",
    });
  });

  afterEach(async function () {
    await Item.deleteMany({});
  });

  it("should fetch item by ID and return 200", async function () {
    const response = await request(server).get(
      `/api/items/items/${mockItem._id}`
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.include({ name: "Test Item" });
    expect(response.body)
      .to.have.property("_id")
      .that.equals(mockItem._id.toString());
  });
});
