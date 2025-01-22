// routes/blog.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getRelatedBlogs,
} = require("../controllers/blogcont");

// Create post (protected route)
router.post("/create-post", verifyToken, isAdmin, createPost);

// Get all posts (public route) & search for specific blog
router.get("/", getPosts);

// Get a single post (protected route)
router.get("/:id", getPostById);

// update a post (protected route)
router.patch("/update-post/:id", verifyToken, isAdmin, updatePost);

// delete a post with the related comment
router.delete("/:id", deletePost);

//related blog
router.get("/related/:id", getRelatedBlogs);

module.exports = router;
