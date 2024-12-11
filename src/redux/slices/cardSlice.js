import { createSlice } from "@reduxjs/toolkit";
import getCharacteristicLocalStorage from "../../utils/getCharacteristicLocalStorage";
import getAnalogLocalStorage from "../../utils/getAnalogLocalStorage";

const initialState = {
  category: "",
  characteristics: getCharacteristicLocalStorage(),
  analog: getAnalogLocalStorage(),
  currentPage: 1,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCategoryProduct(state, action) {
      state.category = action.payload;
    },
    setCharacteristics(state, action) {
      state.characteristics = action.payload;
    },
    setAnalog(state, action) {
      state.analog = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      /* state.sort = action.payload.sort; */
      state.currentPage = Number(action.payload.currentPage);
      /* state.category = Number(action.payload.category); */
    },
  },
});

export const {
  setCharacteristics,
  setCategoryProduct,
  setAnalog,
  setCurrentPage,
  setFilters,
} = cardSlice.actions;

export default cardSlice.reducer;
