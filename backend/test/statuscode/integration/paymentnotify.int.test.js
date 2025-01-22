const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server");
const crypto = require("crypto");
const { expect } = require("chai");

const mongoURL =
  process.env.testDBURL;

before(async function () {
  this.timeout(15000);
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

after(async function () {
  // Disconnect after tests
  this.timeout(15000);
  await mongoose.connection.close();
});

describe("POST /payment/notify - Integration Test", function () {
  let correctMd5sig;
  let incorrectMd5sig;

  beforeEach(() => {
    // Prepare the correct md5sig
    correctMd5sig = crypto
      .createHash("md5")
      .update(
        "1228344" +
        "Order002" +
        "600" +
        "LKR" +
        "2" +
        crypto
          .createHash("md5")
          .update("MTcxNjYzOTYzNTMzMDAyOTM1MTcxMTExMjg4NTE5NDEzNzUwMTU2MQ==")
          .digest("hex")
          .toUpperCase()
      )
      .digest("hex")
      .toUpperCase();

    // Prepare an incorrect md5sig for failure case
    incorrectMd5sig = "WRONG_MD5_SIGNATURE";
  });

  it("should process payment successfully with correct md5sig", async () => {
    const response = await request(server)
      .post("/payment/notify")
      .send({
        merchant_id: "1228344",
        order_id: "Order002",
        payhere_amount: "600",
        payhere_currency: "LKR",
        status_code: "2",
        md5sig: correctMd5sig,
      })
      .expect(200);

    expect(response.text).to.equal("Notification processed successfully");
  });
});
