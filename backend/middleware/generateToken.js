const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET_KEY = "2a07e48211f246a8196430641b40b1eb110ba35c11c68974d12f5dea7d87ab7279be8a3e5737f46a1c6359348becfb21eb48ad49cba88ad696f15132efe75536";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    console.error("Failed to generate token", error);
    throw error;
  }
};

module.exports = generateToken;
