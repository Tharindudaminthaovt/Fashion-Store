const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const placeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "POST_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "POST_ORDER_FAILED":
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

export const placeOrderGetTailorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_ORDER_TAILOR_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "POST_ORDER_TAILOR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "POST_ORDER_TAILOR_FAILED":
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

export const getAllOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "GET_ALL_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "GET_ALL_ORDERS_FAILED":
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

export const acceptOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACCEPT_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "ACCEPT_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "ACCEPT_ORDER_FAILED":
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

export const getOrderByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "GET_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "GET_ORDER_FAILED":
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

export const updateOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "UPDATE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case "UPDATE_ORDER_FAILED":
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
