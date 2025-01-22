import axios from "axios";

export const getAllWishlistItems = () => async (dispatch) => {
  dispatch({ type: "GET_WISHLIST_REQUEST" });
  try {
    const response = await axios.get(
      "http://localhost:5000/api/wishlist/getallwishlists",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "GET_WISHLIST_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_WISHLIST_FAILED", payload: error.message });
  }
};

export const updateWishList = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATER_WISHLIST_REQUEST" });
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/wishlistItem/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Data from server:", response.data);

    // Return the server's response data
    dispatch({ type: "UPDATE_WISHLIST_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(
      "Error during request:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: "UPDATE_WISHLIST_FAILED", payload: error.message });
  }
};

export const updateWishListItem = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATER_WISHLIST_ITEM_REQUEST" });
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/wishlist/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Return the server's response data
    dispatch({ type: "UPDATE_WISHLIST_ITEM_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(
      "Error during request:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: "UPDATE_WISHLIST_ITEM_FAILED", payload: error.message });
  }
};

export const addWishList = (formData) => async (dispatch) => {
  dispatch({ type: "ADD_WISHLIST_REQUEST" });
  try {
    const response = await axios.post(
      `http://localhost:5000/api/wishlistItem/addwishlist`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Data from server:", response.data);

    dispatch({ type: "ADD_WISHLIST_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(
      "Error during request:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: "ADD_WISHLIST_FAILED", payload: error.message });
  }
};

export const deleteWishListItem = (id, formData) => async (dispatch) => {
  dispatch({ type: "DELETE_WISHLIST_ITEM_REQUEST" });
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/wishlist/deleteWishlistItem/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Data from server:", response.data);

    dispatch({ type: "DELETE_WISHLIST_ITEM_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(
      "Error during request:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: "DELETE_WISHLIST_ITEM_FAILED", payload: error.message });
  }
};

export const deleteWishList = (id, formData) => async (dispatch) => {
  dispatch({ type: "DELETE_WISHLIST_REQUEST" });
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/wishlist/deleteWishlist/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Data from server:", response.data);

    dispatch({ type: "DELETE_WISHLIST_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(
      "Error during request:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: "DELETE_WISHLIST_FAILED", payload: error.message });
  }
};
