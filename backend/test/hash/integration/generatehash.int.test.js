const request = require("supertest");
const express = require("express");
const server = require("../../../server.js");
const { expect } = require("chai");

describe("Integration Test: generateHash", () => {
  before(async function () {
    this.timeout(15000);
  });

  after(async function () {
    this.timeout(15000);
  });

  it("should generate a hash and return it in the response", async () => {
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
    const expectedHash = require("crypto-js/md5")(
      merchantId + orderId + amountFormatted + currency + merchantSecret
    )
      .toString()
      .toUpperCase();

    const response = await request(server).post("/h/generate-hash").send({
      order_id: orderId,
    });

    expect(response.status).to.equal(200);
    expect(response.body.hash).to.equal(expectedHash);
  });
});
