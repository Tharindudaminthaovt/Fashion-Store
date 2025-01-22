const crypto = require("crypto");
const { paymentNotify } = require("../../../controllers/statuscodecont");

describe("POST /payment/notify - Unit Test", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        merchant_id: "1228344",
        order_id: "Order002",
        payhere_amount: "600",
        payhere_currency: "LKR",
        status_code: "2",
        md5sig: "",
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

  test("should process payment successfully with correct md5sig", async () => {
    const correctMd5sig = crypto
      .createHash("md5")
      .update(
        req.body.merchant_id +
          req.body.order_id +
          req.body.payhere_amount +
          req.body.payhere_currency +
          req.body.status_code +
          crypto
            .createHash("md5")
            .update("MTcxNjYzOTYzNTMzMDAyOTM1MTcxMTExMjg4NTE5NDEzNzUwMTU2MQ==")
            .digest("hex")
            .toUpperCase()
      )
      .digest("hex")
      .toUpperCase();

    req.body.md5sig = correctMd5sig;

    await paymentNotify(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      "Notification processed successfully"
    );
  });

  test("should return 400 if md5sig does not match", async () => {
    const incorrectMd5sig = "WRONG_MD5_SIGNATURE";
    req.body.md5sig = incorrectMd5sig;

    await paymentNotify(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid notification");
  });
});
