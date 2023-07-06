import { createSlice } from "@reduxjs/toolkit";

const mangaSlice = createSlice({
  name: "manga",
  initialState: {
    detail: {
      currentData: null,
    },
  },
  reducers: {
    mangaData: (state, action) => {
      state.detail.currentData = action.payload;
    },
  },
});

export const { mangaData } = mangaSlice.actions;
export default mangaSlice.reducer;
