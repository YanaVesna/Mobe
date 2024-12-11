// store.js
import { configureStore } from "@reduxjs/toolkit";
import comparedProducts from "./slices/compareSlice";
import cardReducer from "./slices/cardSlice";
import cartAdd from "./slices/cartAdd";
import productReducer from "../reducers/productReducer";
import filter from "./slices/filterSlice";
import likedProducts from "../redux/slices/wishlistSlice";

const store = configureStore({
  reducer: {
    comparedProducts: comparedProducts,
    cardReducer,
    cartAdd,
    products: productReducer,
    likedProducts: likedProducts,
    filter,
  },
});

export default store;
