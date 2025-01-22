const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server.js");
const Test = require("../../../models/test.js");
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
  await Test.deleteMany({}); // Clear the collection before running tests
});

after(async function () {
  await mongoose.disconnect(); // Disconnect after all tests
});

describe("GET /getalltest - Integration Test", function () {
  beforeEach(async function () {
    // Seed the database with sample data
    await Test.insertMany([
      { test: "Test 1", description: "Description 1" },
      { test: "Test 2", description: "Description 2" },
    ]);
  });

  afterEach(async function () {
    await Test.deleteMany({}); // Clear the collection after each test
  });

  it("should fetch all test items and return 200", async function () {
    const response = await request(server).get("/getalltest");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.length(2);

    const fetchedItems = response.body;
    expect(fetchedItems[0]).to.include({
      test: "Test 1",
      description: "Description 1",
    });
    expect(fetchedItems[1]).to.include({
      test: "Test 2",
      description: "Description 2",
    });
  });

  it("should handle database errors gracefully and return 400", async function () {
    //Simulate a database error
    sinon.stub(Test, "find").rejects(new Error("Database error"));
    const response = await request(server).get("/getalltest");
    expect(response.status).to.equal(400);
    Test.find.restore();
  });
});
