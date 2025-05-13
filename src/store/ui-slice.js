// this containds the state,reducer func and actions of cart components
//1.1
import { createSlice } from "@reduxjs/toolkit";

//1.2 creating the ui Slice
const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});
//1.4 also export actions which contains all the functions in reducer
export const uiActions = uiSlice.actions
//1.3 export the slice
export default uiSlice;