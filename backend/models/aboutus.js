const mongoose = require('mongoose');


const aboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    
  },
  content: {
    type: String,
    required: true,
    
  },
  image: {
    type: String, 
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const Aboutus = mongoose.model('Aboutuspage',aboutUsSchema);

console.log('Aboutus model created:', Aboutus);

module.exports = Aboutus;