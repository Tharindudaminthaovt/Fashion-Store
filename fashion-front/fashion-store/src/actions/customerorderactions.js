import axios from "axios";

export const fetchcustomers = async (token) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/customer/customers",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token as Authorization header
        },
      }
    );
    console.log("Fetched customers data:", response.data); // Log the response to check data
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching user customers:", error); // Log the error
    throw new Error("Failed to fetch customers");
  }
};

export const postcustomer = async (customerData) => {
  try {
    // Retrieve the token from local storage (or another secure storage method)
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://127.0.0.1:5000/api/customer/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(customerData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to post customer: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting customer:", error); // Log the error
    throw error; // Re-throw the error for further handling
  }
};

export const placeOrder = (formData) => async (dispatch) => {
  dispatch({ type: "POST_ORDER_REQUEST" });
  try {
    const response = await axios.post(
      `http://localhost:5000/api/placeorder`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Data from server:", response.data);

    dispatch({ type: "POST_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(
      "Error during request:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: "POST_ORDER_FAILED", payload: error.message });
  }
};

export const getTailorById = (id) => async (dispatch) => {
  dispatch({ type: "POST_ORDER_TAILOR_REQUEST" });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/tailors/tailor/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "POST_ORDER_TAILOR_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching tailor by ID:", error);
    dispatch({ type: "POST_ORDER_TAILOR_FAILED", payload: error.message });
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_ORDERS_REQUEST" });
  try {
    const response = await axios.get("http://localhost:5000/api/placeorder",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: error.message });
  }
};

export const acceptOrderById = (id) => async (dispatch) => {
  dispatch({ type: "ACCEPT_ORDER_REQUEST" });
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/placeorder/accept/${id}`,undefined,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "ACCEPT_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching tailor by ID:", error);
    dispatch({ type: "ACCEPT_ORDER_FAILED", payload: error.message });
  }
};

export const getOrderById = (id) => async (dispatch) => {
  dispatch({ type: "GET_ORDER_REQUEST" });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/placeorder/order/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "GET_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching tailor by ID:", error);
    dispatch({ type: "GET_ORDER_FAILED", payload: error.message });
  }
};

export const updateOrderById = (id, formdata) => async (dispatch) => {
  dispatch({ type: "UPDATE_ORDER_REQUEST" });
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/placeorder/${id}`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching tailor by ID:", error);
    dispatch({ type: "UPDATE_ORDER_FAILED", payload: error.message });
  }
};
