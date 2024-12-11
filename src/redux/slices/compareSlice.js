import { createSlice } from "@reduxjs/toolkit";

const loadComparedProductsFromStorage = () => {
  try {
    const comparedProductsString = localStorage.getItem("comparedProducts");
    return comparedProductsString !== null ? JSON.parse(comparedProductsString) : [];
  } catch (error) {
    console.error("Error parsing comparedProductsString:", error);
    return [];
  }
};


const saveComparedProductsToStorage = (comparedProducts) => {
  localStorage.setItem("comparedProducts", JSON.stringify(comparedProducts));
};

const MAX_PRODUCTS = 2;

const comparedProductsSlice = createSlice({
  name: "comparedProducts",
  initialState: {
    comparedProducts: loadComparedProductsFromStorage(),
    showPopup: false,
  },
  reducers: {
    addComparedProduct: (state, action) => {
      if (state.comparedProducts.length < MAX_PRODUCTS) {
        state.comparedProducts.push(action.payload);
        saveComparedProductsToStorage(state.comparedProducts);
      } else {
        state.showPopup = true;
      }
    },
    removeComparedProduct: (state, action) => {
      state.comparedProducts = state.comparedProducts.filter(
        (product) => product.id !== action.payload
      );
      saveComparedProductsToStorage(state.comparedProducts);
    },
    clearComparedProducts: (state) => {
      state.comparedProducts = [];
      saveComparedProductsToStorage(state.comparedProducts);
    },
    hidePopup: (state) => {
      state.showPopup = false;
    },
  },
});

export const { addComparedProduct, removeComparedProduct, clearComparedProducts, hidePopup } =
  comparedProductsSlice.actions;
export default comparedProductsSlice.reducer;
