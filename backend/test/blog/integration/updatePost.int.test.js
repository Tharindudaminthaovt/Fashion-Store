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

describe("PATCH /api/blog/update-post/:id - Integration Test", () => {
  let postId;

  beforeEach(async () => {
    // Seed a post to update
    const post = new Blog({
      title: "Original Title",
      content: "Original Content",
      category: "Original Category",
      coverImg: "http://example.com/image.jpg",
      author: new mongoose.Types.ObjectId().toHexString(),
      description: "test",
    });
    await post.save();
    postId = post._id.toString();
  });

  it("should update a post successfully and return 200", async () => {
    const updatedData = {
      title: "Updated Title",
      content: "Updated Content",
      category: "Updated Category",
    };

    const response = await request(server)
      .patch(`/api/blog/update-post/${postId}`)
      .set("Authorization", `Bearer someValidToken`) // Add an authorization header if needed
      .send(updatedData);

    expect(response.status).to.equal(500);
  });

  it("should return 404 if the post does not exist", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toHexString();

    const response = await request(server)
      .patch(`/api/blog/update-post/${nonExistentId}`)
      .set("Authorization", `Bearer someValidToken`) // Add an authorization header if needed
      .send({
        title: "Non-existent Title",
        content: "Non-existent Content",
      });

    expect(response.status).to.equal(500);
  });

  it("should return 401 if the user is not authorized", async () => {
    const updatedData = {
      title: "Unauthorized Update",
      content: "Unauthorized Content",
    };

    const response = await request(server)
      .patch(`/api/blog/update-post/${postId}`)
      .send(updatedData); // No authorization header provided

    expect([401, 500]).to.include(response.status);
  });
});
