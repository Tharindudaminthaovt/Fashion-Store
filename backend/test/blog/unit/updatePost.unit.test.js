const mongoose = require("mongoose");
const Blog = require("../../../models/user");
const { updatePost } = require("../../../controllers/blogcont");

describe("PUT /api/posts/:id - Update Post", () => {
  let req, res, mockPost;

  beforeEach(() => {
    req = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
      body: {
        title: "Updated Title",
        content: "Updated content of the post.",
        category: "Updated Category",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    mockPost = {
      _id: req.params.id,
      title: "Updated Title",
      content: "Updated content of the post.",
      category: "Updated Category",
      author: new mongoose.Types.ObjectId().toHexString(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should update the post and return status 200 with updated post", async () => {
    jest.spyOn(Blog, "findByIdAndUpdate").mockResolvedValue(mockPost);

    await updatePost(req, res);

    expect(Blog.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Post updated successfully",
      post: mockPost,
    });
  });

  test("should return 404 if the post to update is not found", async () => {
    jest.spyOn(Blog, "findByIdAndUpdate").mockResolvedValue(null);

    await updatePost(req, res);

    expect(Blog.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Post not found" });
  });

  test("should return 500 if there is an error during update", async () => {
    jest
      .spyOn(Blog, "findByIdAndUpdate")
      .mockRejectedValue(new Error("Database error"));

    await updatePost(req, res);

    expect(Blog.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Failed to fetch post",
    });
  });
});
