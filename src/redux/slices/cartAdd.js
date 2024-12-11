import { createSlice } from "@reduxjs/toolkit";
import getCartFromLocalStorage from "../../utils/getCartFromLocalStorage";
import getTotalPriceFromLocalStorage from "../../utils/getTotalPriceFromLocalStorage";

const initialState = {
  totalPrice: getTotalPriceFromLocalStorage(),
  totalCount: 0,
  items: getCartFromLocalStorage(),
};

const cartAdd = createSlice({
  name: "cartAdd",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.buytogether === action.payload.buytogether
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.buytogether === action.payload.buytogether
      );
      if (findItem) {
        findItem.count--;

        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);

        state.totalCount = state.items.reduce((sum, obj) => {
          return obj.count + sum;
        }, 0);
      }
    },
    removeItem(state, action) {
      const findItem = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.buytogether !== action.payload.buytogether
      );

      state.items = findItem.filter(
        (obj) => obj.id !== `${action.payload.id}"acsessuare"`
      );

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartAdd.actions;

export default cartAdd.reducer;
