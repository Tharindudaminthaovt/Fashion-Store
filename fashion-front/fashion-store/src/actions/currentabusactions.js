import { setCurrentAboutUs,  getCurrentAboutUs } from '../Apis/currentAUapi'; // Ensure the path to your API file is correct

// Action Types
export const SET_CURRENT_ABOUT_US = 'SET_CURRENT_ABOUT_US';
export const GET_CURRENT_ABOUT_US = 'GET_CURRENT_ABOUT_US';

// Action Creators

// Set the current About Us entry
export const setCurrentAboutUsAction = (aboutUsId) => async (dispatch) => {
  try {
    const data = await setCurrentAboutUs(aboutUsId);
    dispatch({ type: SET_CURRENT_ABOUT_US, payload: data });
  } catch (error) {
    console.error('Error setting current About Us entry:', error);
  }
};

// Get the current About Us entry
export const getCurrentAboutUsAction = () => async (dispatch) => {
  try {
    const data = await  getCurrentAboutUs();
    dispatch({ type: GET_CURRENT_ABOUT_US, payload: data });
  } catch (error) {
    console.error('Error fetching current About Us entry:', error);
  }
};
