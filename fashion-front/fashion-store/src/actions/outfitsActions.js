import axios from "axios";

export const getOutfits = () => async (dispatch) => {
  dispatch({ type: "GET_OUTFITS_REQUEST" });
  try {
    const response = await axios.get("http://localhost:5000/api/outfits/outfit",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    dispatch({ type: "GET_OUTFITS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_OUTFITS_FAILED", payload: error.message });
  }
};

export const createOutfit = (outfitData) => async (dispatch) => {
  dispatch({ type: "CREATE_OUTFIT_REQUEST" });
  try {
    await axios.post("http://localhost:5000/api/outfits/outfit", outfitData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    dispatch({ type: "CREATE_OUTFIT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "CREATE_OUTFIT_FAILED", payload: error.message });
  }
};

export const getOutfitById = (id) => async (dispatch) => {
  dispatch({ type: "GET_OUTFIT_BY_ID_REQUEST" });
  try {
    const response = await axios.get(`http://localhost:5000/api/outfits/outfit/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    console.log(response)
    dispatch({ type: "GET_OUTFIT_BY_ID_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_OUTFIT_BY_ID_FAILED", payload: error.message });
  }
};

export const updateOutfit = (id, updatedData) => async (dispatch) => {
  dispatch({ type: "UPDATE_OUTFIT_REQUEST" });
  try {
    await axios.put(`http://localhost:5000/api/outfits/outfit/${id}`, updatedData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    dispatch({ type: "UPDATE_OUTFIT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "UPDATE_OUTFIT_FAILED", payload: error.message });
  }
};

export const deleteOutfit = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_OUTFIT_REQUEST" });
  try {
    await axios.delete(`http://localhost:5000/api/outfit/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    dispatch({ type: "DELETE_OUTFIT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "DELETE_OUTFIT_FAILED", payload: error.message });
  }
};
