const md5 = require("crypto-js/md5");
const { generateHash } = require("../../../controllers/hashcont");

describe("generateHash", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        order_id: "Order002", // Mocked order_id from the code
      },
    };
    res = {
      json: jest.fn(),
    };

    // Mock console.log during tests
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should generate a hash and return it in the response", () => {
    // Test data
    const merchantId = "1228344";
    const merchantSecret =
      "MTcxNjYzOTYzNTMzMDAyOTM1MTcxMTExMjg4NTE5NDEzNzUwMTU2MQ==";
    const orderId = "Order002";
    const amount = "600";
    const currency = "LKR";

    // Expected hash
    const amountFormatted = parseFloat(amount)
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })
      .replaceAll(",", "");
    const expectedHash = md5(
      merchantId + orderId + amountFormatted + currency + merchantSecret
    )
      .toString()
      .toUpperCase();

    generateHash(req, res);

    expect(res.json).toHaveBeenCalledWith({ hash: expectedHash });
    expect(console.log).toHaveBeenCalledWith(
      "Received order_id:",
      req.body.order_id
    );
  });
});
