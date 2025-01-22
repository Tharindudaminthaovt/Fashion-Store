import axios from "axios";

export const searchItems = (query) => async (dispatch) => {
  dispatch({ type: "SEARCH_ITEMS_REQUEST" });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/items/search-results?category=${query}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "SEARCH_ITEMS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "SEARCH_ITEMS_FAILED", payload: error.message });
  }
};
