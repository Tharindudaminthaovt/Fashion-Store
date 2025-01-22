const AboutUs = require('../models/aboutus');


// Create a new About Us entry
const createAboutUs = async (req, res) => {
    try {
      const { title, content, image } = req.body;
  
      const newAboutUs = new AboutUs({
        title,
        content,
        image
      });
  
      const savedAboutUs = await newAboutUs.save();
      res.status(201).json(savedAboutUs);
    } catch (error) {
      res.status(500).json({ message: 'Error creating About Us entry', error: error.message });
    }
  };
  
  // Get all About Us entries
  const getAllAboutUs = async (req, res) => {
    try {
      const aboutUsEntries = await AboutUs.find();
      res.status(200).json(aboutUsEntries);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching About Us entries', error: error.message });
    }
  };
  
  // Get a single About Us entry by ID
  const getAboutUsById = async (req, res) => {
    try {
      const { id } = req.params;
      const aboutUsEntry = await AboutUs.findById(id);
  
      if (!aboutUsEntry) {
        return res.status(404).json({ message: 'About Us entry not found' });
      }
  
      res.status(200).json(aboutUsEntry);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching About Us entry', error: error.message });
    }
  };
  
  // Update an About Us entry
  const updateAboutUs = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedAboutUs = await AboutUs.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedAboutUs) {
        return res.status(404).json({ message: 'About Us entry not found' });
      }
  
      res.status(200).json(updatedAboutUs);
    } catch (error) {
      res.status(500).json({ message: 'Error updating About Us entry', error: error.message });
    }
  };
  
  // Delete an About Us entry
  const deleteAboutUs = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAboutUs = await AboutUs.findByIdAndDelete(id);
      if (!deletedAboutUs) {
        return res.status(404).json({ message: 'About Us entry not found' });
      }
  
      res.status(200).json({ message: 'About Us entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting About Us entry', error: error.message });
    }
  };
  
  module.exports = {
    createAboutUs,
    getAllAboutUs,
    getAboutUsById,
    updateAboutUs,
    deleteAboutUs
  };
  