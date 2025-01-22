const mongoose = require("mongoose");
const Tailor = require("../../../models/tailor");
const { deleteTailor } = require("../../../controllers/tailorcont");

describe("DELETE /api/tailors/deleteTailor/:id - deleteTailor", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
      io: {
        emit: jest.fn(), // Mock socket.io emit method
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

  test("should successfully delete a tailor and emit a socket event", async () => {
    const mockTailor = {
      _id: req.params.id,
      name: "John Doe",
      email: "john@example.com",
      category: "Suits",
    };

    jest.spyOn(Tailor, "findByIdAndDelete").mockResolvedValue(mockTailor);

    await deleteTailor(req, res);

    expect(Tailor.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tailor deleted successfully",
    });
    expect(req.io.emit).toHaveBeenCalledWith("deleteTailor", mockTailor);
  });

  test("should return 404 if tailor is not found", async () => {
    jest.spyOn(Tailor, "findByIdAndDelete").mockResolvedValue(null);

    await deleteTailor(req, res);

    expect(Tailor.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Tailor not found" });
  });

  test("should handle errors and return 500", async () => {
    const errorMessage = "Database error";
    jest
      .spyOn(Tailor, "findByIdAndDelete")
      .mockRejectedValue(new Error(errorMessage));

    await deleteTailor(req, res);

    expect(Tailor.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error deleting tailor",
      error: errorMessage,
    });
  });
});
