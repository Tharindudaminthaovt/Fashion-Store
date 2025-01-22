export const getAllWishlistItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "GET_WISHLIST_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_WISHLIST_SUCCESS":
      return {
        loading: false,
        wishlistItems: action.payload,
      };
    case "GET_WISHLIST_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const updateWishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATER_WISHLIST_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "UPDATE_WISHLIST_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "UPDATE_WISHLIST_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateWishlistItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATER_WISHLIST_ITEM_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "UPDATE_WISHLIST_ITEM_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "UPDATE_WISHLIST_ITEM_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addWishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WISHLIST_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "ADD_WISHLIST_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "ADD_WISHLIST_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case "ADD_WISHLIST_DEFAULT":
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const deleteWishlistItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_WISHLIST_ITEM_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "DELETE_WISHLIST_ITEM_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "DELETE_WISHLIST_ITEM_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteWishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_WISHLIST_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "DELETE_WISHLIST_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "DELETE_WISHLIST_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
