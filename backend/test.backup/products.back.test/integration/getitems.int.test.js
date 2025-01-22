const express = require("express");
const sinon = require('sinon');
const { expect } = require('chai');
const mongoose = require("mongoose"); // Ensure mongoose is required
const mongoURL = process.env.testDBURL;
const Item = require("../../../models/item.js");
const itemRouter = require("../../../routes/itemroutes.js");
const { getallitems } = require('../../../controllers/itemcont.js');

//initialize Express app
const app = express();
app.use(express.json());
app.use("/", itemRouter); //use the item routes

describe('API Endpoint Tests', function () {
  let findStub;

  // Increase the timeout for the entire suite
  this.timeout(10000);

  before(async function () {
    // Increase timeout for the before hook if needed
    this.timeout(10000);

    // Ensure mongoose connection is properly handled
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


    await Item.deleteMany({});
  });

  after(async function () {
    //Disconnect from the database after tests
    await mongoose.disconnect();
  });

  // Before each test, stub Item.find to ensure we control its behavior
  beforeEach(function () {
    findStub = sinon.stub(Item, 'find');
  });

  // After each test, restore the stubbed method
  afterEach(function () {
    sinon.restore();
  });

  describe('getallitems', function () {
    it('Should return all items as a JSON array when items exist', async function () {
      const req = {}; // Mock request object (no specific parameters needed for this endpoint)
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      // Mock items data
      const mockItems = [
        {
          _id: "1",
          name: "Shirt",
          variants: ["Small", "Medium", "Large"],
          prices: { Small: 10, Medium: 15, Large: 20 },
          category: "Clothing",
          description: "A comfortable shirt",
          fashioncollection: "Spring",
          targetmarket: "Youth",
          rating: 4.5,
        },
        {
          _id: "2",
          name: "Shoes",
          variants: ["7", "8", "9"],
          prices: { "7": 50, "8": 55, "9": 60 },
          category: "Footwear",
          description: "Stylish running shoes",
          fashioncollection: "Summer",
          targetmarket: "Athletes",
          rating: 4.7,
        },
      ];

      // Simulate the database call
      findStub.returns(Promise.resolve(mockItems));

      await getallitems(req, res);

      // Check that the response status is 200
      sinon.assert.calledWith(res.status, 200);

      // Check that the response json method was called with the correct items data
      sinon.assert.calledWith(res.json, mockItems);
    });

    it('Should return an empty array if no items exist', async function () {
      const req = {}; // Mock request object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      // Simulate a case where no items are found
      findStub.returns(Promise.resolve([]));

      await getallitems(req, res);

      // Check that the response status is 200
      sinon.assert.calledWith(res.status, 200);

      // Check that the response json method was called with an empty array
      sinon.assert.calledWith(res.json, []);
    });

    it('Should return an error if fetching items fails', async function () {
      const req = {}; // Mock request object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      // Simulate an error during the database call
      findStub.returns(Promise.reject(new Error('Database error')));

      await getallitems(req, res);

      // Check that the response status is 500
      sinon.assert.calledWith(res.status, 500);

      // Check that the response json method was called with the error message
      sinon.assert.calledWith(res.json, { message: 'Database error' });
    });
  });
});
