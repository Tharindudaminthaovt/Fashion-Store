import { SET_CURRENT_ABOUT_US, GET_CURRENT_ABOUT_US } from '../actions/currentabusactions'; // Ensure the path to your actions file is correct

const initialState = {
  currentAboutUs: null,
  error: null,
};

export const currentAboutUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ABOUT_US:
      return {
        ...state,
        currentAboutUs: action.payload,
        error: null, // Clear errors on successful action
      };
    case GET_CURRENT_ABOUT_US:
      return {
        ...state,
        currentAboutUs: action.payload,
        error: null, // Clear errors on successful action
      };
    default:
      return state;
  }
};
