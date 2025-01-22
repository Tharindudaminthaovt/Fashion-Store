const mongoose = require("mongoose");
const Tailor = require("../../../models/tailor");
const { updateTailor } = require("../../../controllers/tailorcont");

describe("PUT /api/tailors/:id - updateTailor", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
      body: {
        name: "Updated Name",
        email: "updated@example.com",
        category: "Shirts",
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

  test("should successfully update the tailor and emit socket event", async () => {
    const mockTailor = {
      _id: req.params.id,
      name: "Updated Name",
      email: "updated@example.com",
      category: "Shirts",
    };

    jest.spyOn(Tailor, "findByIdAndUpdate").mockResolvedValue(mockTailor);

    await updateTailor(req, res);

    expect(Tailor.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    expect(req.io.emit).toHaveBeenCalledWith("updateTailor", mockTailor);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTailor);
  });

  test("should return 404 if the tailor to update is not found", async () => {
    jest.spyOn(Tailor, "findByIdAndUpdate").mockResolvedValue(null);

    await updateTailor(req, res);

    expect(Tailor.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    expect(req.io.emit).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Tailor not found" });
  });
});
