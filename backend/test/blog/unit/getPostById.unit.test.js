const mongoose = require("mongoose");
const Blog = require("../../../models/user");
const { updatePost } = require("../../../controllers/blogcont");

describe("PATCH /api/posts/:id - Update a blog post", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
      body: {
        title: "Updated Title",
        content: "Updated Content",
        category: "Updated Category",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should update post successfully and return 200", async () => {
    const existingPost = {
      _id: req.params.id,
      title: "Old Title",
      content: "Old Content",
      category: "Old Category",
      save: jest.fn().mockResolvedValue(),
    };

    jest.spyOn(Blog, "findByIdAndUpdate").mockResolvedValue(existingPost);

    await updatePost(req, res);

    expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Post updated successfully",
      post: existingPost,
    });
  });

  test("should return 404 if post not found", async () => {
    jest.spyOn(Blog, "findByIdAndUpdate").mockResolvedValue(null);

    await updatePost(req, res);

    expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Post not found" });
  });
});
