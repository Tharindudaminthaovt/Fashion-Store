import {
    POST_PRODUCT_REQUEST,
    POST_PRODUCT_SUCCESS,
    POST_PRODUCT_FAILURE,
  } from "../actions/itemactions";
  


export const getAllItemsReducer= (state= {items : [] },action)=>{
    switch(action.type)
    {
        case 'GET_ITEMS_REQUEST' : return{
            loading:true,
            ...state
        }
        case 'GET_ITEMS_SUCCESS' : return {
            loading:false,
            items: action.payload
        }
        case 'GET_ITEMS_FAILED': return{
            
            error: action.payload,
            loading :false
        }
        default :return state
    }
        
    }


    
  const initialState = {

    loading: false,
    success: false,
    error: null,
    data: null,
  };
  
  export  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          success: false,
          error: null,
        };
      case POST_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          data: action.payload,
        };
      case POST_PRODUCT_FAILURE:
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
  


/* export const patchProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PATCH_PRODUCT_SUCCESS':
        return {
          ...state,
          product: action.payload,
        };
      case 'PATCH_PRODUCT_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  */





  

  export const deleteItemReducer = (state = { items: [] }, action) => {
    switch (action.type) {
      case "DELETE_ITEM_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "DELETE_ITEM_SUCCESS":
        return {
          ...state,
          loading: false,
          items: state.items.filter((item) => item.id !== action.payload),
          success: true,
        };
      case "DELETE_ITEM_FAILED":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  