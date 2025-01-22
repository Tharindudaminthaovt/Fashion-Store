export const searchItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "SEARCH_ITEMS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "SEARCH_ITEMS_SUCCESS":
      return {
        loading: false,
        items: action.payload,
      };
    case "SEARCH_ITEMS_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
