const mongoose = require("mongoose");

console.log("bleh");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    speciality: { type: String },
    targetmarket: { type: String },
    rating: { type: Number, default: 0 },
  }
  //{ timestamps: true,}
);

const Tailor = mongoose.model("tailor", itemSchema, "tailor");
console.log("Tailor model created:", Tailor);

module.exports = Tailor;
