const mongoose = require("mongoose");

//console.log("bleh");

// Define schema options to suppress warnings
const schemaOptions = { suppressReservedKeysWarning: true };

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    variants: { type: [String], default: [] },
    prices: { type: Object, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    collection: { type: String },
    targetmarket: { type: String },
    rating: { type: Number, default: 0 },
  },
  schemaOptions // Apply schema options here
  //////{ timestamps: true,}
);

const Item = mongoose.model("Item", itemSchema, "stocks"); ////here stock is db name and the itemModel is refernced in server.js
console.log("Item model created:", Item);

module.exports = Item;
