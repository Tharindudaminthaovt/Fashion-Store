const mongoose = require("mongoose");
const Tailor = require("../../../models/tailor");
const { createPost } = require("../../../controllers/tailorcont");

describe("POST /api/tailor - createPost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        image: "www.image.com",
        email: "test@gmail.com",
        category: "Suits",
        description: "for testing",
      },
      io: {
        emit: jest.fn(),
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should create a new tailor successfully and return 201", async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: new mongoose.Types.ObjectId(),
      name: "John Doe",
      image: "www.image.com",
      email: "test@gmail.com",
      category: "Suits",
      description: "for testing",
    });

    jest.spyOn(Tailor.prototype, "save").mockImplementation(mockSave);

    await createPost(req, res);

    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      post: expect.objectContaining({
        name: "John Doe",
        image: "www.image.com",
        email: "test@gmail.com",
        category: "Suits",
        description: "for testing",
      }),
    });
    expect(req.io.emit).toHaveBeenCalledWith(
      "createTailor",
      expect.any(Object)
    );
  });

  test("should return 500 if there is an error creating the post", async () => {
    const errorMessage = "Database error";
    const mockSave = jest.fn().mockRejectedValue(new Error(errorMessage));

    jest.spyOn(Tailor.prototype, "save").mockImplementation(mockSave);

    await createPost(req, res);

    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error creating post",
      error: errorMessage,
    });
    expect(req.io.emit).not.toHaveBeenCalled();
  });
});
