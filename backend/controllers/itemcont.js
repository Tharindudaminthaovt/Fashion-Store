const Item = require('../models/item');

// get all items
const getallitems = async (req, res) => {
    try {
        const stocks = await Item.find({});
        console.log("Items fetched from DB:", stocks);
        res.status(200).json(stocks);
    } catch (error) {
        // console.error("Error fetching items:", error); // Logs detailed error for debugging
        res.status(500).json({ message: error.message || "An unexpected error occurred" }); // Sends clear error response
    }
};


const getItemById = async (req, res) => {
    const { id } = req.params; // Extract item ID from request parameters
    try {
        // Find the item by ID
        const item = await Item.findById(id);

        if (!item) {
            // If no item found, return 404 status with a message
            return res.status(404).json({ message: "Item not found" });
        }

        // Send the found item as the response
        res.status(200).json(item);
    } catch (error) {
        // console.error("Error fetching item by ID:", error); // Log detailed error for debugging
        res.status(500).json({ message: error.message || "An unexpected error occurred" }); // Send error response
    }
};


//add a new item
const addItem = async (req, res) => {
    const { name, prices, variants, description, targetmarket, category, fashioncollection,image } = req.body;
    try {
        const newItem = new Item({
            name, prices, description, variants, targetmarket, category, fashioncollection,image
        });
        await newItem.save();
//
req.io.emit("item created", newItem);
//

        console.log("New item saved to DB:", newItem);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', message: 'Invalid data provided' });
    }
};


//update an item by ID
const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
//
req.io.emit("item updated", updatedItem);
//
        res.status(200).json({ updatedItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

//delete an item by ID
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        //
req.io.emit("item deleted", deletedItem);
//
        return res.status(204).send();  // successfully deleted
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete item', error });
    }
};



//search items by category
const searchItems = async (req, res) => {
    try {
        const { category } = req.query; 
        
        // no need to call find, can call distinct only
        const categories = await Item.distinct("category", {
          category: { $regex: category, $options: "i" },
        });
        const items = await Item.find({
          category: { $regex: category, $options: 'i' },
      });
    
        console.log('Search items:', categories);
        res.json(items);
      } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
};

//get items by fashioncollection name
const getItemsByfashioncollection = async (req, res) => {
    const fashioncollectionName = req.params.name;
    try {
        const items = await Item.find({ fashioncollection: fashioncollectionName });
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this fashioncollection' });
        }
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items for fashioncollection' });
    }
};

// Get all unique fashioncollections
const getfashioncollections = async (req, res) => {
    try {
        const fashioncollectionNames = await Item.distinct('fashioncollection');
        if (fashioncollectionNames.length === 0) {
            return res.status(404).send('No fashioncollections found.');
        }
        res.status(200).json(fashioncollectionNames);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
module.exports = {
    getallitems,
    addItem,
    updateItem,
    deleteItem,getItemById,searchItems
  };