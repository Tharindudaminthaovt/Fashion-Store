const Test = require("../models/test");

const getAllTest = async (req, res) => {
  try {
    const testres = await Test.find({});
    console.log("sending items");
    console.log("Items fetched from DB:", testres);
    res.json(testres);
    //res.status(200).json(stocks); // Send items as a JSON response
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createTest = async (req, res) => {
  try {
    console.log("test reached");
    const newtest = new Test({
      test: "Casual Hoodie",
      description: "Comfortable hoodie perfect for casual wear.",
    });

    await newtest.save();
    res.json({ message: "Item created successfully!" });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTest,
  createTest,
};
