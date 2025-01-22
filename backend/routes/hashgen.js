const express = require("express");
const app = express();
const router = express.Router(); // Create the router
const { generateHash } = require("../controllers/hashcont");

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" })); // Adjust for your frontend origin

app.use(express.json()); // Middleware to parse JSON request bodies

// Route to generate hash
router.post("/generate-hash", generateHash);

// Register the router with the Express app
module.exports = router;

// Start the server
