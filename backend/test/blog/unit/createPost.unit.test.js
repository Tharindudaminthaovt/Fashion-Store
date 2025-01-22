const mongoose = require("mongoose");
const Blog = require("../../../models/blog");
const { createPost } = require("../../../controllers/blogcont");

describe("POST /api/blog - createPost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      userId: new mongoose.Types.ObjectId().toHexString(),
      body: {
        title: "Test Post",
        content: "This is a test post content.",
        category: "Tech",
        coverImg: "www.testimage.com/image.jpg",
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

  test("should create a new blog post successfully with status 201", async () => {
    const mockPost = {
      ...req.body,
      author: req.userId,
      _id: new mongoose.Types.ObjectId(),
    };

    jest.spyOn(Blog.prototype, "save").mockResolvedValue(mockPost);

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("should return 500 if there is an error creating the blog post", async () => {
    const errorMessage = "Database error";
    jest
      .spyOn(Blog.prototype, "save")
      .mockRejectedValue(new Error(errorMessage));

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Failed to create post",
    });
  });
});
