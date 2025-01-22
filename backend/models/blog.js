const mongoose = require("mongoose");
//modify after creating users

//create blog schema
const BlogSchema = new mongoose.Schema({
  //add title to blog schema
  title: {
    type: String,
    required: true,
  },

  //add description to blog schema
  description: {
    type: String,
    required: true,
  },

  //add content to blog schema
  content: {
    type: Object,
    required: true,
  },

  //add cover image to blog schema
  coverImg: {
    type: String,
  },

  //add category to blog schema
  category: {
    type: String,
    required: true,
  },

  //add author to blog schema
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //add rating to blog schema

  rating: {
    type: Number,
    default: 0,
  },

  //add date to blog schema
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
