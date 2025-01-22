const mongoose = require("mongoose");
const Tailor = require("../../../models/tailor");
const { getTailorById } = require("../../../controllers/tailorcont");

describe("GET /api/tailor/:id - getTailorById", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
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

  test("should return the tailor successfully with status 200", async () => {
    const mockTailor = {
      _id: req.params.id,
      name: "John Doe",
      experience: 10,
      specialization: "Suits",
    };

    jest.spyOn(Tailor, "findById").mockResolvedValue(mockTailor);

    await getTailorById(req, res);

    expect(Tailor.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTailor);
  });

  test("should return 404 if tailor is not found", async () => {
    jest.spyOn(Tailor, "findById").mockResolvedValue(null);

    await getTailorById(req, res);

    expect(Tailor.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Tailor not found" });
  });
});
