import {
  createAboutUs, 
  getAllAboutUs, 
  getAboutUsById, 
  updateAboutUs, 
  deleteAboutUs
} from '../Apis/aboutusAPI'; // Ensure the path to your API file is correct

// Action Types
export const FETCH_ALL_ABOUT_US = 'FETCH_ALL_ABOUT_US';
export const FETCH_ABOUT_US_BY_ID = 'FETCH_ABOUT_US_BY_ID';
export const CREATE_ABOUT_US = 'CREATE_ABOUT_US';
export const UPDATE_ABOUT_US = 'UPDATE_ABOUT_US';
export const DELETE_ABOUT_US = 'DELETE_ABOUT_US';

// Action Creators

// Fetch all About Us entries
export const fetchAllAboutUs = () => async (dispatch) => {
  try {
    const data = await getAllAboutUs();
    dispatch({ type: FETCH_ALL_ABOUT_US, payload: data });
  } catch (error) {
    console.error('Error fetching all About Us entries:', error);
  }
};

// Fetch a specific About Us entry by ID
export const fetchAboutUsById = (id) => async (dispatch) => {
  try {
    const data = await getAboutUsById(id);
    dispatch({ type: FETCH_ABOUT_US_BY_ID, payload: data });
  } catch (error) {
    console.error('Error fetching About Us entry by ID:', error);
  }
};

// Create a new About Us entry
export const createAboutUsAction = (aboutUsData) => async (dispatch) => {
  try {
    const data = await createAboutUs(aboutUsData);
    dispatch({ type: CREATE_ABOUT_US, payload: data });
  } catch (error) {
    console.error('Error creating About Us entry:', error);
  }
};

// Update an existing About Us entry
export const updateAboutUsAction = (id, updatedData) => async (dispatch) => {
  try {
    const data = await updateAboutUs(id, updatedData);
    dispatch({ type: UPDATE_ABOUT_US, payload: data });
  } catch (error) {
    console.error('Error updating About Us entry:', error);
  }
};

// Delete an About Us entry
export const deleteAboutUsAction = (id) => async (dispatch) => {
  try {
    await deleteAboutUs(id);
    dispatch({ type: DELETE_ABOUT_US, payload: id });
  } catch (error) {
    console.error('Error deleting About Us entry:', error);
  }
};
