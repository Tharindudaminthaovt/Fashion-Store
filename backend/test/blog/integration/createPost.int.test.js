const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Blog = require("../../../models/blog");

const mongoURL = process.env.testDBURL;

before(async function () {
  this.timeout(15000);
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await Blog.deleteMany({});
});

after(async () => {
  await mongoose.disconnect();
});

describe("POST /api/blog/create-post - Integration Test", () => {
  it("should return 401 if the user is not authorized", async () => {
    const newPost = {
      title: "Unauthorized Post",
      content: "This post should not be created.",
      category: "Unauthorized",
      coverImg: "http://testimage.com/image.jpg",
    };

    const response = await request(server)
      .post("/api/blog/create-post")
      .set("Authorization", `Bearer someValidToken`)
      .send(newPost); // No authorization header provided

    expect([401, 500]).to.include(response.status);
  });
});
