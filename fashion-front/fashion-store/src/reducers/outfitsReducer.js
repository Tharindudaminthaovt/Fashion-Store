export const outfitReducer = (
  state = { outfits: [], outfit: null },
  action
) => {
  switch (action.type) {
    case "GET_OUTFITS_REQUEST":
    case "CREATE_OUTFIT_REQUEST":
    case "GET_OUTFIT_BY_ID_REQUEST":
    case "UPDATE_OUTFIT_REQUEST":
    case "DELETE_OUTFIT_REQUEST":
      return {
        ...state,
        loading: true,
        success: false
      };
    case "GET_OUTFITS_SUCCESS":
      return {
        ...state,
        loading: false,
        outfits: action.payload,
      };
    case "CREATE_OUTFIT_SUCCESS":
    case "UPDATE_OUTFIT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "GET_OUTFIT_BY_ID_SUCCESS":
      return {
        ...state,
        loading: false,
        outfit: action.payload,
      };
    case "DELETE_OUTFIT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "GET_OUTFITS_FAILED":
    case "CREATE_OUTFIT_FAILED":
    case "GET_OUTFIT_BY_ID_FAILED":
    case "UPDATE_OUTFIT_FAILED":
    case "DELETE_OUTFIT_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
