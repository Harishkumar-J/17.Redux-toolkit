// //1.1 create the store

// import { configureStore } from "@reduxjs/toolkit";
// //1.3 import the slices
// import uiSlice from "./ui-slice";

// //1.2 store contains reducers

// const store = configureStore({
//   reducer: { ui: uiSlice.reducer },
// });

// //1.4 export the store
// export default store;

//1-------------------------------------------------------------------------------------------

//2.1 cartSlice

import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
//2.2
import cartSlice from "./cart-slice";

//2.3
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

//1.4 export the store
export default store;