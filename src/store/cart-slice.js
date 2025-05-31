// //1.1 creating the cart- slice
// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     totalQuantity: 0,
//   },
//   reducers: {
//     addItemToCart(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.items.find((item) => item.id === newItem.id);
//       state.totalQuantity++;
//       if (!existingItem) {
//         state.items.push({
//           id: newItem.id,
//           price: newItem.price,
//           quantity: 1,
//           totalPrice: newItem.price,
//           name: newItem.title,
//         });
//       } else {
//         existingItem.quantity++;
//         existingItem.totalPrice = existingItem.totalPrice + newItem.price;
//       }
//     },
//     removeItemFromCart(state, action) {
//       state.totalQuantity--;
//       const id = action.payload;
//       const existingItem = state.items.find((item) => item.id === id);
//       if (existingItem.quantity === 1) {
//         state.items = state.items.filter((item) => item.id !== id);
//       } else {
//         existingItem.quantity--;
//         existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
//       }
//     },
//   },
// });

// export const cartActions = cartSlice.actions;
// export default cartSlice;

//1------------------------------------------------------------------------------

//2 using  action creator thunk,, where the http calls is handled

import { createSlice } from "@reduxjs/toolkit";
//2.3 import uiActions
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.totalQuantity--;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//2.1 since we are working with cart data , this slice is utilized
//2.2 THUNK is a function which returns the action using another function
// MAIN func (data) -> SUB func- using the data and DISPATCH
export const sendCartData = (cart) => {
 // 2.5 this below 'dispatch' is automatically given by the redux toolkit, 
 // when a function is dispatched instead of an action
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    //2.3 creating a function for send and catch request
    const sendRequest = async () => {
      const response = await fetch(
        '"https://shop-cart-redux-3f2e8-default-rtdb.firebaseio.com/cart.json"',
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    //2.4 main block where the sendRequest function is called
    try {
      await sendRequest;
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Item added to the cart!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
