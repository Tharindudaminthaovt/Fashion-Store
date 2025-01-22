const mongoose = require("mongoose");

console.log("customer orderrr");

const customerorderSchema = new mongoose.Schema({
  customerName: { type: String, required: true, unique: true },
  customerEmail: { type: String, required: true, unique: true },
  order: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tailorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tailor",
    required: true,
  },
  accepted: { type: Boolean, required: true, default: false },
});

const Customer = mongoose.model("customer", customerorderSchema, "customer");
console.log("customer model created:", Customer);

module.exports = Customer;
