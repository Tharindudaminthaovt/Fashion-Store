const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server.js");
const Wishlist = require("../../../models/wishlist.js");
const { getAllWishlists } = require("../../../controllers/wishlistcont.js");

// const wishlistRouter = require("../../../routes/wishlistRoutes.js");
const sinon = require("sinon");
const { expect } = require("chai");

const mongoURL =
  process.env.testDBURL;

before(async function () {
  this.timeout(25000); // Increase timeout for connection to MongoDB
  await Wishlist.deleteMany({});
  // Ensure no previous connection exists
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

after(async () => {
  await mongoose.disconnect(); // Disconnect from the database after tests
});

describe("API Endpoint Tests", function () {
  this.timeout(10000);
  it("Should successfully add a new Wishlist and return it with a 201 status", async () => {
    const newWishlist = {
      user: "63d2f1a9c8a4c9315f8e1234",
      items: [
        {
          item: "63d2f1a9c8a4c9315f8e5678",
          quantity: 2,
          rating: 4.5,
          notes: "Perfect gift for a birthday",
          isPurchased: false,
        },
      ],
    };

    const response = await request(server) // Use the Express app server instance
      .post("/api/wishlist/addwishlist")
      .send(newWishlist);

    console.log("Response Body:", response.body); // Log actual response
    console.log("Response Status:", response.status); // Log response status

    expect(response.status).to.equal(201);
    expect(response.body.user).to.equal(newWishlist.user);
    //expect(response.body.items).to.be.an('array').that.has.lengthOf(1);
    expect(response.body.items[0].item).to.equal("63d2f1a9c8a4c9315f8e5678");
    expect(response.body.items[0].quantity).to.equal(2);
    expect(response.body.items[0].rating).to.equal(4.5);
    expect(response.body.items[0].notes).to.equal(
      "Perfect gift for a birthday"
    );
    expect(response.body.items[0].isPurchased).to.be.false;

    console.log("Response Body:", response.body);
  });

  it("should return a 400 error when an internal server error occurs", async () => {
    // Simulating a database error or server issue
    sinon.stub(Wishlist.prototype, "save").rejects(new Error("Database error"));

    const newWishlist = {
      user: "63d2f1a9c8a4c9315f8e1234",
      Wishlists: [
        {
          Wishlist: "63d2f1a9c8a4c9315f8e5678",
          quantity: 2,
          rating: 4.5,
          notes: "Perfect gift for a birthday",
          isPurchased: false,
        },
      ],
    };

    const response = await request(server)
      .post("/api/wishlist/addwishlist") // Adjust the endpoint if needed
      .send(newWishlist);

    expect(response.status).to.equal(400); // Expect 400 status
    expect(response.body).to.have.property("error", "Bad Request");
    expect(response.body)
      .to.have.property("message")
      .that.includes("Invalid data provided");

    // Restore the stubbed method
    Wishlist.prototype.save.restore();
  });
});
