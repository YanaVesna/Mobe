import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actions/productActions";

import { LIKE_PRODUCT, DISLIKE_PRODUCT } from "../actions/toogleLike";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      const productsWithLike = action.payload.map((product) => ({
        ...product,
        like: false, 
      }));
      return {
        loading: false,
        products: productsWithLike,
        error: "",
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
      case LIKE_PRODUCT:
        case DISLIKE_PRODUCT:
          const productId = action.payload.productId;
          const likeValue = action.type === LIKE_PRODUCT;
        
          return {
            ...state,
            products: state.products.map((product) =>
              product.id === productId ? { ...product, like: likeValue } : product
            ),
          };
        
    default:
      return state;
  }
};

export default productReducer;
