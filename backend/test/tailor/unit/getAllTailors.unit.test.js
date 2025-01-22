const Tailor = require("../../../models/tailor");
const { getAllTailors } = require("../../../controllers/tailorcont");

describe("GET /api/tailors - getAllTailors", () => {
  let req, res;

  beforeEach(() => {
    req = {}; // No request parameters needed for this function
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return all tailors successfully with status 200", async () => {
    const mockTailors = [
      {
        _id: "61f8a9c4e1b8b74a52d3e5c4",
        name: "John Doe",
        image: "www.image.com",
        email: "test@gmail.com",
        category: "Suits",
        description: "for testing",
      },
      {
        _id: "61f8a9c4e1b8b74a52d3e5c5",
        name: "Jane Smith",
        image: "www.image.com",
        email: "test1@gmail.com",
        category: "Dresses",
        description: "for testing",
      },
    ];

    jest.spyOn(Tailor, "find").mockResolvedValue(mockTailors);

    await getAllTailors(req, res);

    expect(Tailor.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTailors);
  });

  test("should handle errors and return status 500", async () => {
    const mockError = new Error("Database query failed");

    jest.spyOn(Tailor, "find").mockRejectedValue(mockError);

    await getAllTailors(req, res);

    expect(Tailor.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error fetching tailors",
      error: mockError.message,
    });
  });
});
