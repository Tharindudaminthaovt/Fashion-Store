import {
    FETCH_ALL_ABOUT_US,
    FETCH_ABOUT_US_BY_ID,
    CREATE_ABOUT_US,
    UPDATE_ABOUT_US,
    DELETE_ABOUT_US,
  } from '../actions/aboutusactions';
  
  const initialState = {
    aboutUs: {
      loading: false,
      error: null,
      entries: [],
    },
    createAboutUs: {
      loading: false,
      success: false,
      error: null,
    }
  }
  
  export const aboutUsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_ABOUT_US:
        return { ...state, aboutUs: { ...state.aboutUs, loading: false,entries: action.payload } };

        case FETCH_ABOUT_US_BY_ID:
            return { ...state, loading: false, selectedEntry: action.payload };

          case CREATE_ABOUT_US:
            return { ...state, createAboutUs: 
                { loading: false, success: true, error: null },
                 aboutUs: { ...state.aboutUs, entries: [...state.aboutUs.entries, action.payload] } };

          case UPDATE_ABOUT_US:
            return {
              ...state,
              aboutUs: {
                ...state.aboutUs,
                entries: state.aboutUs.entries.map((entry) =>
                  entry.id === action.payload.id ? action.payload : entry
                ),
              },
              createAboutUs: { loading: false, success: true, error: null }, // Set success state here
            };
     
      case DELETE_ABOUT_US:
        return {
          ...state,
          aboutUs: {
            ...state.aboutUs,
            entries: state.aboutUs.entries.filter((entry) => entry.id !== action.payload),
          },
        };
      default:
        return state;
    }
  };
  