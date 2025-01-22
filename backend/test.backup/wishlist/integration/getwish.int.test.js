const express = require("express");
const mongoose = require("mongoose");
const { expect } = require("chai");
const Wishlist = require("../../../models/wishlist.js");
const { getAllWishlists } = require("../../../controllers/wishlistcont.js");
const sinon = require("sinon");
const wishlistRouter = require("../../../routes/wishlistRoutes.js");

const mongoURL =
  process.env.testDBURL;

const app = express();
app.use(express.json());
app.use("/", wishlistRouter);

describe("API Endpoint Tests ", function () {
  let findStub;

  this.timeout(10000);

  before(async function () {
    if (mongoose.connection.readyState === 0) {
      try {
        await mongoose.connect(mongoURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (err) {
        console.error("Database connection failed:", err);
        throw err;
      }
    }

    await Wishlist.deleteMany({});
  });

  after(async function () {
    await mongoose.disconnect();
  });

  afterEach(function () {
    sinon.restore();
  });

  beforeEach(function () {
    findStub = sinon.stub(Wishlist, "find").resolves([
      {
        user: "63d2f1a9c8a4c9315f8e1234",
        items: [
          {
            item: "63d2f1a9c8a4c9315f8e5678",
            quantity: 2,
            rating: 4.5,
            notes: "Perfect gift for a birthday",
            isPurchased: false,
          },
        ],
        createdAt: "2024-12-14T12:00:00Z",
        _id: "675d35e297687958279ac966",
      },
    ]);
  });

  describe("getAllWishlists", function () {
    it("Should return all Wishlists as a JSON array when Wishlists exist", async function () {
      const req = {}; // Mock request object (no specific parameters needed for this endpoint)
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      // Insert mock data into the database
      const mockWishlists = [
        {
          user: "63d2f1a9c8a4c9315f8e1234",
          items: [
            {
              item: "63d2f1a9c8a4c9315f8e5678",
              quantity: 2,
              rating: 4.5,
              notes: "Perfect gift for a birthday",
              isPurchased: false,
            },
          ],
          createdAt: "2024-12-14T12:00:00Z",
        },
      ];
      // Simulate the database call
      findStub.returns(Promise.resolve(mockWishlists));

      await getAllWishlists(req, res);

      // Check that the response status is 200
      sinon.assert.calledWith(res.status, 200);

      // Check that the response json method was called with the correct items data
      sinon.assert.calledWith(res.json, mockWishlists);
    });

    it("Should return an empty array if no Wishlists exist", async function () {
      // Clear database
      await Wishlist.deleteMany({});
      sinon.restore();
      sinon.stub(Wishlist, "find").resolves([]);

      const req = {};
      const res = {
        statusCode: null,
        jsonData: null,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.jsonData = data;
        },
      };

      await getAllWishlists(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonData).to.be.an("array");
      expect(res.jsonData).to.be.empty;
    });

    it("Should return an error if fetching Wishlists fails", async function () {
      sinon.restore();
      sinon.stub(Wishlist, "find").rejects(new Error("Database error"));

      const req = {};
      const res = {
        statusCode: null,
        jsonData: null,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.jsonData = data;
        },
      };

      // Simulate an error by forcing a database disconnection
      await mongoose.disconnect();

      await getAllWishlists(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.jsonData).to.deep.equal({
        message: "Error fetching Wishlists",
      });
    });
  });
});
