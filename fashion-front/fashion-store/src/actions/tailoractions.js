import axios from 'axios';
import io from 'socket.io-client';

// Initialize WebSocket connection
const socket = io('http://localhost:5000');

// Action Types
export const GET_TAILORS_REQUEST = 'GET_TAILORS_REQUEST';
export const GET_TAILORS_SUCCESS = 'GET_TAILORS_SUCCESS';
export const GET_TAILORS_FAILURE = 'GET_TAILORS_FAILURE';
export const CREATE_TAILOR_SUCCESS = 'CREATE_TAILOR_SUCCESS';
export const UPDATE_TAILOR_SUCCESS = 'UPDATE_TAILOR_SUCCESS';
export const DELETE_TAILOR_SUCCESS = 'DELETE_TAILOR_SUCCESS';

// Get All Tailors
export const getAlltailors = () => async (dispatch) => {
  dispatch({ type: GET_TAILORS_REQUEST });

  try {
    const response = await axios.get('http://localhost:5000/api/tailors/getallTailors');
    dispatch({ type: GET_TAILORS_SUCCESS, payload: response.data });

    // WebSocket Event Listeners
    socket.on('createTailor', (newTailor) => {
      console.log('New tailor created:', newTailor);
      dispatch({ type: CREATE_TAILOR_SUCCESS, payload: newTailor });
    });

    socket.on('updateTailor', (updatedTailor) => {
      console.log('Tailor updated:', updatedTailor);
      dispatch({ type: UPDATE_TAILOR_SUCCESS, payload: updatedTailor });
    });

    socket.on('deleteTailor', (deletedTailorId) => {
      console.log('Tailor deleted:', deletedTailorId);
      dispatch({ type: DELETE_TAILOR_SUCCESS, payload: deletedTailorId });
    });
  } catch (error) {
    dispatch({ type: GET_TAILORS_FAILURE, payload: error.message });
  }
};


// Post Tailor Data
 export const posttailorData = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/tailors/create-post', formData);
    dispatch({ type: CREATE_TAILOR_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    console.error('Error creating tailor:', error);
    throw error;
  }
};


// Update Tailor Data
export const updateTailor = (id, formData) => async (dispatch) => {
  try {
    const response = await axios.patch(`http://localhost:5000/api/tailors/updatetailor/${id}`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch({ type: UPDATE_TAILOR_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    console.error('Error updating tailor:', error);
    throw error;
  }
};


// Delete Tailor
 export const deleteTailorById = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/tailors/deleteTailor/${id}`);
    dispatch({ type: DELETE_TAILOR_SUCCESS, payload: id });
  } catch (error) {
    console.error('Error deleting tailor:', error);
    throw error;
  }
};

// Fetch Tailor By ID
 export const getTailorById = (id) => async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/tailors/tailor/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tailor by ID:', error);
    throw error;
  }
};
