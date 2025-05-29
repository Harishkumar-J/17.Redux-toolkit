// // this containds the state,reducer func and actions of cart components
// //1.1
// import { createSlice } from "@reduxjs/toolkit";

// //1.2 creating the ui Slice
// const uiSlice = createSlice({
//   name: "ui",
//   initialState: { cartIsVisible: false },
//   reducers: {
//     toggle(state) {
//       state.cartIsVisible = !state.cartIsVisible;
//     },
//   },
// });
// //1.4 also export actions which contains all the functions in reducer
// export const uiActions = uiSlice.actions
// //1.3 export the slice
// export default uiSlice;

//1---------------------------------------------

//2.1 notification for sending cart data status
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  //2.2 adding notification state
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    //2.3 reducer function for notification
    showNotification(state, action) {
      //2.4 setting then state to have status value received from action payload
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
