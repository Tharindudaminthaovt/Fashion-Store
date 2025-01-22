import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
export const getAllitems = () => async (dispatch) => {
  dispatch({ type: 'GET_ITEMS_REQUEST' });

  try {
    const response = await axios.get('http://localhost:5000/api/items/items');
   
    console.log(response);
    
    dispatch({ type: 'GET_ITEMS_SUCCESS', payload: response.data });
    socket.on('item updated', (updatedItem) => {
      console.log('Real-time update received:', updatedItem);

      // Dispatch action to update the store with the new item data
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    });
  } catch (error) {
    dispatch({ type: 'GET_ITEMS_FAILED', payload: error.message });
  }
}



export const patchProductData = async (id, formData) => {
  try {
    const response = await axios.patch(`http://localhost:5000/api/items/items/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Data sent to:', response.data);  // Log the response from server

    // Return the server's response data
    return response.data;
  } catch (error) {
    console.error('Error during request:', error.response?.data || error.message); // Improved error handling
    throw error; // Rethrow the error so handleSubmit can catch it
  }
};

export const deleteItemAction = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_ITEM_REQUEST" });

  try {
    await axios.delete(`http://localhost:5000/api/items/items/${id}`);
    dispatch({ type: "DELETE_ITEM_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_ITEM_FAILED", payload: error.message });
  }
};


export const POST_PRODUCT_REQUEST = "POST_PRODUCT_REQUEST";
export const POST_PRODUCT_SUCCESS = "POST_PRODUCT_SUCCESS";
export const POST_PRODUCT_FAILURE = "POST_PRODUCT_FAILURE";

// Action to Post Product Data
export const postProductData = (formData) => async (dispatch) => {
  try {
    dispatch({ type: POST_PRODUCT_REQUEST });

    const response = await fetch("http://127.0.0.1:5000/api/items/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({ type: POST_PRODUCT_SUCCESS, payload: data });
    } else {
      throw new Error(`Failed to post product: ${response.statusText}`);
    }
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_FAILURE,
      payload: error.message || "Error posting product data",
    });
  }
};
