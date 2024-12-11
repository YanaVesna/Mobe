import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  label: [],
  page: "",
  series: [],
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLabel(state, action) {
      state.label = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSeries(state, action) {
      state.series = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setLabel, setPage, setSeries, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
