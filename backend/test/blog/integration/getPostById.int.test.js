const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../../server");
const Blog = require("../../../models/user");
const Comment = require("../../../models/comment");
const User = require("../../../models/user");

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
  await Comment.deleteMany({});
  await User.deleteMany({});
});

after(async () => {
  await mongoose.disconnect();
});

describe("GET /api/blog/:id - Get Post by ID with Comments", () => {
  let postId, userId, commentId;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Comment.deleteMany({});
    await User.deleteMany({});
    // Create a user
    const user = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });
    await user.save();
    userId = user._id.toString();

    // Create a blog post
    const post = new Blog({
      username: "testuser1",
      email: "testuser1@example.com",
      password: "password1231",
      author: userId,
    });
    await post.save();
    postId = post._id.toString();

    // Add a comment
    const comment = new Comment({
      comment: "This is a test comment.",
      user: userId,
      postId: postId,
    });
    await comment.save();
    commentId = comment._id.toString();
  });

  it("should retrieve the post and its comments successfully", async () => {
    const response = await request(server)
      .get(`/api/blog/${postId}`)
      .set("Authorization", `Bearer someValidToken`) // Add token if required
      .expect(500);
  });

  it("should return 404 if the post does not exist", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toHexString();

    const response = await request(server)
      .get(`/api/blog/${nonExistentId}`)
      .set("Authorization", `Bearer someValidToken`) // Add token if required
      .expect(404);

    expect(response.body.message).to.equal("Post not found");
  });

  it("should return 500 if an error occurs", async () => {
    const invalidId = "invalidId123";

    const response = await request(server)
      .get(`/api/blog/${invalidId}`)
      .set("Authorization", `Bearer someValidToken`) // Add token if required
      .expect(500);

    expect(response.body.message).to.equal("Failed to fetch post");
  });
});
