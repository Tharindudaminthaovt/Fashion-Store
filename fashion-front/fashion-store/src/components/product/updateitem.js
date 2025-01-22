import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Itemcard from '../product/itemcard';
import io from 'socket.io-client';
import { getAllitems, deleteItemAction } from "../../actions/itemactions";
//import { getAllitems } from '../../actions/itemactions';




export default function UpdateItem({ productId }) {
  const socket = io("http://localhost:5000"); // Initialize WebSocket connection

    const dispatch = useDispatch()
const navigate = useNavigate();
    const itemsstate = useSelector(state => state.getAllItemsReducer)
    const [product, setProduct] = useState(null);
    const{items, error, loading } = itemsstate
    //const [liveItems, setLiveItems] = useState([]); // Local state for live updates
    console.log("WebSocket connected:", socket);
    const [updatedItems, setUpdatedItems] = useState([]); 

    // Emit "request" event to the server
socket.emit("request", "Hello, server!");

// Listen for "response" events from the server
socket.on("response", (message) => {
  console.log("Received response from server:", message);
});

useEffect(() => {
    dispatch(getAllitems()); // Fetch initial items from Redux

    // WebSocket event listeners
 // WebSocket event listeners
 socket.on("item created", (newItem) => {
    console.log("New item created:", newItem);
    setUpdatedItems((prev) => {
      console.log("Previous updated items:", prev);
      return [...prev, newItem];
    });
  });

    //socket.on("item updated", (updatedItem) => {
      //console.log("Item updated:", updatedItem);
      //setUpdatedItems((prev) =>
      //  prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      //);
  //  });


  socket.on("item updated", (item) => {
  console.log("Item updated:", item);
  setUpdatedItems((prev) =>
    prev.some((existingItem) => existingItem._id === item._id)
      ? prev.map((existingItem) =>
          existingItem._id === item._id ? item : existingItem
        )
      : [...prev, item]
  );
});

    

    socket.on("item deleted", ({ id }) => {
      console.log("Item deleteddddddddddd:", id);
      setUpdatedItems((prev) => prev.filter((item) => item._id !== id));
    });

    // Cleanup WebSocket listeners on unmount
    return () => {
      socket.off("item created");
      socket.off("item updated");
      socket.off("item deleted");
      socket.disconnect();
    };
  }, [dispatch, productId]);

  // Combine initial items with live updates
 
  // Combine initial items with live updates
  const combinedItems = [...items, ...updatedItems].reduce((acc, item) => {
    const exists = acc.find(existingItem => existingItem._id === item._id);
    return exists ? acc.map(existingItem =>
        existingItem._id === item._id ? item : existingItem
    ) : [...acc, item];
}, []);


const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    try {
      await dispatch(deleteItemAction(id)); // Assuming deleteItemAction returns a promise
      alert("Item deleted successfully!");
    } catch (error) {
      alert("Failed to delete the item. Please try again.");
    }
  }
};


  return (
    <div>
      <div className="row">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Something went wrong</h1>
        ) : (
          combinedItems.map((item) => (
            <div
              className="col-md-4"
              key={item._id}
              style={{ marginTop: "60px" }}
            >
                <Itemcard item={item} rating={item.rating} />
              <div >
                <div style={{display:'flex',justifyContent:'space-around'}}>
                <button style={{backgroundColor:"#313130",color:'white',width:'120px',padding:'2px'}}  onClick={() => handleDelete(item._id)}>Delete</button>
                <button style={{backgroundColor:"#313130",color:'white',width:'120px',padding:'2px'}} onClick={() => navigate(`/updateitem/${item._id}`)}>Update</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};