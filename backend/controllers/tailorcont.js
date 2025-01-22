const Tailor = require("../models/tailor");

// Get tailor by ID
exports.getTailorById = async (req, res) => {
  try {
    const tailor = await Tailor.findById(req.params.id);
    if (!tailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }
    res.status(200).json(tailor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tailor", error: error.message });
  }
};

// Get all tailors
exports.getAllTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find({});
    res.status(200).json(tailors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tailors", error: error.message });
  }
};

// Create a tailor post
exports.createPost = async (req, res) => {
  const newPost = new Tailor(req.body);
  try {
    await newPost.save();

    // Emit the socket event after successful creation
    req.io.emit("createTailor", newPost);

    res.status(201).json({ post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Search tailors by category
exports.searchTailors = async (req, res) => {
  try {
    const { category } = req.query;
    const categories = await Tailor.distinct("category", {
      category: { $regex: category, $options: "i" },
    });

    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching tailors", error: error.message });
  }
};

// Get tailors collection-wise
exports.getCollections = async (req, res) => {
  try {
    const collectionNames = await Tailor.distinct("collection");
    if (collectionNames.length === 0) {
      return res.status(404).json({ message: "No collections found" });
    }
    res.status(200).json(collectionNames);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching collections", error: error.message });
  }
};

// Get tailors for a specific collection
exports.getTailorsByCollection = async (req, res) => {
  try {
    const collectionName = req.params.name;
    const tailors = await Tailor.find({ category: collectionName });
    if (tailors.length === 0) {
      return res
        .status(404)
        .json({ message: "No tailors found for this collection" });
    }
    res.status(200).json(tailors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tailors", error: error.message });
  }
};

// Update a tailor
exports.updateTailor = async (req, res) => {
  try {
    const updatedTailor = await Tailor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }

    // Emit socket event for update
    req.io.emit("updateTailor", updatedTailor);

    res.status(200).json(updatedTailor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating tailor", error: error.message });
  }
};

// Delete a tailor
exports.deleteTailor = async (req, res) => {
  try {
    const deletedTailor = await Tailor.findByIdAndDelete(req.params.id);
    if (!deletedTailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }

    // Emit socket event for deletion
    req.io.emit("deleteTailor", deletedTailor);

    res.status(200).json({ message: "Tailor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting tailor", error: error.message });
  }
};
