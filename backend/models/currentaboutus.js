const mongoose = require("mongoose");

const CurrentAboutUsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "current_aboutus", //fixed ID to ensure only one document exists
  },
  aboutUsId: {
    type: mongoose.Schema.Types.ObjectId, //ref to the AboutUs ID
    ref: "Aboutus",
    required: true,
  },
});



module.exports = mongoose.model("CurrentAboutUs", CurrentAboutUsSchema);