const Customer = require("../models/customer");
const Item = require("../models/item");

// Create a new customer order
const createCustomerOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { order, image, description, customerName, customerEmail, tailorId } =
      req.body;

    // Automatically populate customerName and customerEmail from the logged-in user
    //const customerName = req.userId.name; // Assuming name is available in the user object
    //const customerEmail = req.userId.email; // Assuming email is available in the user object

    const newCustomerOrder = new Customer({
      customerName,
      customerEmail,
      order,
      image,
      description,
      userId: userId, // Linking the order with the logged-in user ID
      tailorId,
    });

    const savedCustomerOrder = await newCustomerOrder.save();
    res.status(201).json(savedCustomerOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating customer order", error: error.message });
  }
};

// Get all customer orders
const getAllCustomerOrders = async (req, res) => {
  try {
    const customerOrders = await Customer.find();
    res.status(200).json(customerOrders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching customer orders",
      error: error.message,
    });
  }
};

// Get a single customer order by ID
const getCustomerOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the customer order by ID and ensure the user is the one who created it
    const customerOrder = await Customer.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!customerOrder) {
      return res.status(404).json({
        message: "Customer order not found or you do not have permission",
      });
    }
    res.status(200).json(customerOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customer order", error: error.message });
  }
};

// Update a customer order
const updateCustomerOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Ensure the order belongs to the logged-in user
    const updatedCustomerOrder = await Customer.findOneAndUpdate(
      { _id: id, userId: req.userId }, // Only allow update if the order belongs to the logged-in user
      updatedData,
      { new: true }
    );

    if (!updatedCustomerOrder) {
      return res.status(404).json({
        message:
          "Customer order not found or you do not have permission to update",
      });
    }

    res.status(200).json(updatedCustomerOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating customer order", error: error.message });
  }
};

// Delete a customer order
const deleteCustomerOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomerOrder = await Customer.findByIdAndDelete(id);
    if (!deletedCustomerOrder) {
      return res.status(404).json({ message: "Customer order not found" });
    }
    res.status(200).json({ message: "Customer order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting customer order", error: error.message });
  }
};

const acceptCustomerOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the order belongs to the logged-in user
    const updatedCustomerOrder = await Customer.findOneAndUpdate(
      { _id: id }, // Only allow update if the order belongs to the logged-in user
      {
        accepted: true,
      },
      { new: true }
    );

    if (!updatedCustomerOrder) {
      return res.status(404).json({
        message:
          "Customer order not found or you do not have permission to update",
      });
    }

    res.status(200).json(updatedCustomerOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating customer order", error: error.message });
  }
};

const postOrder = async (req, res) => {
  console.log("order");

  const {
    name,
    prices,
    variants,
    description,
    targetmarket,
    category,
    collection,
  } = req.body; // Adjust based on your item schema
  try {
    const newItem = new Item({
      name,
      prices,
      description,
      variants,
      targetmarket,
      category,
      collection,
    });
    // Save the item to the database
    await newItem.save();
    console.log("New item saved to DB:", newItem);
    // Send the saved item as a response
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  createCustomerOrder,
  getAllCustomerOrders,
  getCustomerOrderById,
  updateCustomerOrder,
  deleteCustomerOrder,
  acceptCustomerOrder,
  postOrder,
};
