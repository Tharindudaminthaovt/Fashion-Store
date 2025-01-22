import { combineReducers } from "redux";

// Initial state for tailors
const initialTailorsState = {
  loading: false,
  tailors: [],
  error: null,
};

// Reducer for fetching all tailors

export const tailorsReducer = (state = initialTailorsState, action) => {
  switch (action.type) {
    case "GET_TAILORS_REQUEST":
      return { ...state, loading: true, error: null };
    case "GET_TAILORS_SUCCESS":
      return { ...state, loading: false, tailors: action.payload, error: null };
    case "GET_TAILORS_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_TAILOR":
      return { ...state, tailors: [...state.tailors, action.payload], error: null };
    case "UPDATE_TAILOR":
      return {
        ...state,
        tailors: state.tailors.map((tailor) =>
          tailor.id === action.payload.id ? action.payload : tailor
        ),
        error: null,
      };
    case "DELETE_TAILOR":
      return {
        ...state,
        tailors: state.tailors.filter((tailor) => tailor.id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};


// Initial state for posting a tailor
const initialPostState = {
  loading: false,
  success: false,
  error: null,
};

// Reducer for posting a new tailor
 export const postTailorReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case "POST_TAILOR_REQUEST":
      return { ...state, loading: true };
    case "POST_TAILOR_SUCCESS":
      return { ...state, loading: false, success: true, error: null };
    case "POST_TAILOR_FAILED":
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

// Initial state for updating a tailor
const initialUpdateState = {
  loading: false,
  success: false,
  error: null,
};

// Reducer for updating a tailor
 export const updateTailorReducer = (state = initialUpdateState, action) => {
  switch (action.type) {
    case "UPDATE_TAILOR_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_TAILOR_SUCCESS":
      return { ...state, loading: false, success: true, error: null };
    case "UPDATE_TAILOR_FAILED":
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

// Initial state for deleting a tailor
const initialDeleteState = {
  loading: false,
  success: false,
  error: null,
};

// Reducer for deleting a tailor
 export const deleteTailorReducer = (state = initialDeleteState, action) => {
  switch (action.type) {
    case "DELETE_TAILOR_REQUEST":
      return { ...state, loading: true };
    case "DELETE_TAILOR_SUCCESS":
      return { ...state, loading: false, success: true, error: null };
    case "DELETE_TAILOR_FAILED":
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

// Combine all reducers
const TailorootReducer = combineReducers({
    tailors: tailorsReducer,
    postTailor: postTailorReducer,
    updateTailor: updateTailorReducer,
    deleteTailor: deleteTailorReducer,
  });
  
  export default TailorootReducer;