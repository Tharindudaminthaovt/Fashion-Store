const mongoose = require('mongoose');


const outfitSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: true 
  },
  
  items: [{
    itemId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item',  //reference to the Item schema
      required: true 
    },
    itemName: { 
      type: String, 
      required: true 
    },
    itemImage: { 
      type: String, 
      required: true 
    }
  }],
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  image: { 
    type: String, 
    default: '' 
  },
  occasion: { 
    type: String, 
    enum: ['Casual', 'Formal', 'Party', 'Work', 'Sports', 'Other'],
    default: 'Other' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


const Outfit = mongoose.model('Outfit', outfitSchema);

console.log('Outfit model created:', Outfit);

module.exports = Outfit;