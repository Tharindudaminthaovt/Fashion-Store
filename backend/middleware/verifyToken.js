const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "2a07e48211f246a8196430641b40b1eb110ba35c11c68974d12f5dea7d87ab7279be8a3e5737f46a1c6359348becfb21eb48ad49cba88ad696f15132efe75536";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
    console.log("Authorization Header:", token);

    // If token is not provided
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY); // jwt verification
    // // Extract token from "Bearer <token>"
    // const token = authHeader.split(" ")[1];

    // if token is invalid
    if (!decoded.userId) {
      return res.status(401).send({ message: "Invalid token format" });
    }

    // Attach decoded user info to the request object
    req.userId = decoded.userId;
    req.role = decoded.role;

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = verifyToken;
