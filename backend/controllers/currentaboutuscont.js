const CurrentAboutUs = require("../models/currentaboutus");
const AboutUs = require("../models/aboutus");

const setCurrentAboutUs = async (req, res) => {
  try {
    const { aboutUsId } = req.body;

    if (!aboutUsId) {
      return res.status(400).json({ message: "AboutUs ID is required." });
    }

    const aboutUs = await AboutUs.findById(aboutUsId);

    if (!aboutUs) {
      return res.status(404).json({ message: "About Us entry not found." });
    }

    
    const updatedCurrentAboutUs = await CurrentAboutUs.findOneAndUpdate(
      { _id: "current_aboutus" }, 
      { aboutUsId },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Current About Us updated successfully.",
      data: updatedCurrentAboutUs,
    });
  } catch (error) {
    res.status(500).json({ message: "Error setting current About Us.", error: error.message });
  }
};


const getCurrentAboutUs = async (req, res) => {
  try {
   
    const currentEntry = await CurrentAboutUs.findOne({ _id: "current_aboutus" });

    if (!currentEntry) {
      return res.status(404).json({ message: "No current About Us entry found." });
    }

   
    const aboutUs = await AboutUs.findById(currentEntry.aboutUsId);

    if (!aboutUs) {
      return res.status(404).json({ message: "About Us entry not found." });
    }

   
    res.json(aboutUs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching current About Us.", error: err.message });
  }
};
  
  module.exports={
    getCurrentAboutUs,setCurrentAboutUs
  }