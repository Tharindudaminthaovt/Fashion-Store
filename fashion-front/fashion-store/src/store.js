import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

// Import individual reducers
import {
  tailorsReducer,
  postTailorReducer,
  updateTailorReducer,
  deleteTailorReducer,
} from "./reducers/tailorsReducer";
import {
  getAllItemsReducer,
  productReducer,
  deleteItemReducer,
} from "./reducers/itemreducers"; // Import patchProductReducer
import { collectionsReducer } from "./reducers/collectionReducer";
import {
  getAllWishlistItemsReducer,
  updateWishlistReducer,
  updateWishlistItemReducer,
  addWishlistReducer,
  deleteWishlistItemReducer,
  deleteWishlistReducer,
} from "./reducers/wishlistReducer";
import { cartReducer } from "./reducers/cartReducer";
import { aboutUsReducer } from "./reducers/aboutusReducer";
import { currentAboutUsReducer } from "./reducers/currentAUreducer";
import { searchItemsReducer } from "./reducers/searchItemsReducer";
import {
  acceptOrderReducer,
  getAllOrdersReducer,
  getOrderByIdReducer,
  placeOrderGetTailorReducer,
  placeOrderReducer,
  updateOrderReducer,
} from "./reducers/customerorderReducer";
import { outfitReducer } from "./reducers/outfitsReducer";
import authApi from "./reducers/auth/authApi";
import authReducer from "./reducers/auth/authSlice";
import { blogsApi } from "./reducers/blogs/blogsApi";
import commentApi from "./reducers/comments/commentsApi";

// Combine all reducers
const finalReducer = combineReducers({
  getAllItemsReducer: getAllItemsReducer,
  collectionsReducer: collectionsReducer,
  cartReducer: cartReducer,
  aboutUsReducer: aboutUsReducer, // Add the aboutUsReducer here
  currentAboutUsReducer: currentAboutUsReducer,
  productReducer: productReducer,
  deleteItemReducer: deleteItemReducer,
  getAllWishlistItemsReducer: getAllWishlistItemsReducer,
  searchItemsReducer,
  updateWishlistReducer,
  //patchProductReducer: patchProductReducer, // Add the patchProductReducer
  tailors: tailorsReducer, // Individual reducers added
  postTailor: postTailorReducer, // Individual reducers added
  updateTailor: updateTailorReducer, // Individual reducers added
  deleteTailor: deleteTailorReducer, // Individual reducers added,
  updateWishlistItemReducer,
  addWishlistReducer,
  deleteWishlistItemReducer,
  placeOrderReducer,
  placeOrderGetTailorReducer,
  getAllOrdersReducer,
  acceptOrderReducer,
  getOrderByIdReducer,
  updateOrderReducer,
  outfitReducer,
  deleteWishlistReducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
});

// Initialize state for cartReducer
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  cartReducer: { cartItems: Array.isArray(cartItems) ? cartItems : [] },
};

const middleware = [
  thunk,
  authApi.middleware,
  blogsApi.middleware,
  commentApi.middleware,
];

// Configure middleware and DevTools
const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
