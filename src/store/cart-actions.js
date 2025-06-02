// 1 craetring a separate component for managing the actions(mainly - thunks) of cart slice

//1.2

import { uiActions } from "./ui-slice";
//1.4
import { cartActions } from "./cart-slice";

//1.3 new function to fetch data
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://shop-cart-redux-3f2e8-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
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

//1.1
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://shop-cart-redux-3f2e8-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    // main block where the sendRequest function is called
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          //   message: cart.totalQuantity>quantity ? "Item added to the cart!": 'Item removed from the cart',
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
