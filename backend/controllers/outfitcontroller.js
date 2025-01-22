const Outfit = require('../models/outfits');


const createOutfit = async (req, res) => {
  try {
    const userId = req.userId;

    
    const { items, name, description, image, occasion } = req.body;

   
    const newOutfit = new Outfit({
      user: userId, 
      items,
      name,
      description,
      image,
      occasion,
    });

   
    const savedOutfit = await newOutfit.save();
    res.status(201).json(savedOutfit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating outfit', error: error.message });
  }
};


const getUserOutfits = async (req, res) => {
  try {
    
    const token = req.headers.authorization; 
    console.log('Received Token:', token); 

    const userId = req.userId; 
    if (!userId) {
      console.log('No user ID found in the token or token is invalid'); 
      return res.status(400).json({ message: 'User not found or invalid token' });
    }

    const outfits = await Outfit.find({ user: userId }); 
    res.status(200).json(outfits); 
  } catch (error) {
    console.error('Error fetching outfits:', error); 
    res.status(500).json({ message: 'Error fetching outfits', error: error.message });
  }
};



// Get a single outfit by ID
const getOutfitById = async (req, res) => {
  try {
    const { id } = req.params;
    const outfit = await Outfit.findById(id).populate('items.itemId');
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.status(200).json(outfit);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching outfit', error: error.message });
  }
};

// Update an outfit
const updateOutfit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedOutfit = await Outfit.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedOutfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.status(200).json(updatedOutfit);
  } catch (error) {
    res.status(500).json({ message: 'Error updating outfit', error: error.message });
  }
};

// Delete an outfit
const deleteOutfit = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOutfit = await Outfit.findByIdAndDelete(id);
    if (!deletedOutfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.status(200).json({ message: 'Outfit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting outfit', error: error.message });
  }
};

module.exports = {
  createOutfit,
  getUserOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit
};
