import { createSlice } from "@reduxjs/toolkit";

const loadLikedProductsFromStorage = () => {
  const likedProductsString = localStorage.getItem("likedProducts");
  return likedProductsString ? JSON.parse(likedProductsString) : [];
};

const saveLikedProductsToStorage = (likedProducts) => {
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
};

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState: { likedProducts: loadLikedProductsFromStorage() },
  reducers: {
    addLikedProduct: (state, action) => {
      state.likedProducts.push(action.payload);
      saveLikedProductsToStorage(state.likedProducts);
    },
    removeLikedProduct: (state, action) => {
      state.likedProducts = state.likedProducts.filter(
        (product) => product.id !== action.payload
      );
      saveLikedProductsToStorage(state.likedProducts);
    },
    clearLikedProducts: (state) => {
      state.likedProducts = [];
      saveLikedProductsToStorage(state.likedProducts);
    },
  },
});

export const { addLikedProduct, removeLikedProduct, clearLikedProducts } =
  likedProductsSlice.actions;
export default likedProductsSlice.reducer;