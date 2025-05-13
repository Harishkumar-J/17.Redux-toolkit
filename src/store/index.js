//1.1 create the store

import { configureStore } from "@reduxjs/toolkit";
//1.3 import the slices
import uiSlice from "./ui-slice";

//1.2 store contains reducers

const store = configureStore({
  reducer: { ui: uiSlice.reducer },
});

//1.4 export the store
export default store;
