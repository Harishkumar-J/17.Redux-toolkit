// //1 rendering Cart component

// import Cart from './components/Cart/Cart';
// import Layout from './components/Layout/Layout';
// import Products from './components/Shop/Products';

// //1.1 import selector and store states
// import { useSelector } from 'react-redux';

// function App() {
// //1.2
//   const showCart = useSelector(state => state.ui.cartIsVisible)
//   return (
//     <Layout>
//       {/* 1.3 */}
//       { showCart && <Cart />}
//       <Products />
//     </Layout>
//   );
// }

// export default App;

//1---------------------------------------------------------------------

// //2 USING USEEFFECT WITH REDUX

// //2.1
// import { useEffect } from "react";
// import Cart from "./components/Cart/Cart";
// import Layout from "./components/Layout/Layout";
// import Products from "./components/Shop/Products";
// import { useSelector } from "react-redux";

// function App() {
//   //2.1 working out the cart data
//   const cart = useSelector((state) => state.cart);
//   const showCart = useSelector((state) => state.ui.cartIsVisible);

//   //2.2 http call to update the state changes in the backend storage(Firebase realtime database)
//   // using PUT method to overwrite the changes
//   useEffect(() => {
//     fetch(
//       "https://shop-cart-redux-3f2e8-default-rtdb.firebaseio.com/cart.json",
//       {
//         method: "PUT",
//         body: JSON.stringify(cart),
//       }
//     )
//   }, [cart]);

//   return (
//     <Layout>
//       {showCart && <Cart />}
//       <Products />
//     </Layout>
//   );
// }

// export default App;

//2-----------------------------------------------------------------------------

// //3 Showing Notification for cart item changes
// // to notify if the item added in backend we need async await to capture thre response
// // or to deal with the side effects

// import { useEffect } from "react";
// import Cart from "./components/Cart/Cart";
// import Layout from "./components/Layout/Layout";
// import Products from "./components/Shop/Products";
// import { useSelector } from "react-redux";
// //3.3 to use the notification reducer import useDispatch and actions
// import { useDispatch } from "react-redux";
// import { uiActions } from "./store/ui-slice";
// //3.10
// import Notification from "./components/UI/Notification";
// import { Fragment } from "react";

// //3.10 to restrict the sendCartData in useEffect to run at 2nd time
// // we use a global variable

// let isInitial = true;

// function App() {
//   const cart = useSelector((state) => state.cart);
//   const showCart = useSelector((state) => state.ui.cartIsVisible);
//   //3.8 displaying the notification
//   const notification = useSelector((state) => state.ui.notification);
//   //3.3
//   const dispatch = useDispatch();
//   //3.4 null

//   useEffect(() => {
//     //3.1 async-await
//     const sendCartData = async () => {
//       //3.5 keep the notification as pending before we get a response
//       dispatch(
//         uiActions.showNotification({
//           status: "pending",
//           title: "Sending...",
//           message: "Sending cart data",
//         })
//       );
//       const response = await fetch(
//         "https://shop-cart-redux-3f2e8-default-rtdb.firebaseio.com/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify(cart),
//         }
//       );
//       //3.2 error if not data sent
//       if (!response.ok) {
//         throw new Error("Failed to send Cart data");
//       }

//       //3.5 if response is ok
//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "Item added to the cart!",
//         })
//       );
//     };

//     //3.11 does not block in the second time
//     if (isInitial === true) {
//       isInitial = false;
//       return;
//     }
//     //3.6 execute the sendCartData function and also catch the error
//     sendCartData().catch((error) => {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "Error!",
//           message: "Sending cart data failed!",
//         })
//       );
//     });
//     //3.7 dispatch in dependency
//   }, [cart, dispatch]);

//   return (
//     //3.9 Using the Notification component
//     <Fragment>
//       {notification && (
//         <Notification
//           status={notification.status}
//           title={notification.title}
//           message={notification.message}
//         />
//       )}
//       <Layout>
//         {showCart && <Cart />}
//         <Products />
//       </Layout>
//     </Fragment>
//   );
// }

// export default App;

//3------------------------------------------------------------------------------------------------------



// //4 Using Action creator Thunk to move http calls out of the component

// import { useEffect } from "react";
// import Cart from "./components/Cart/Cart";
// import Layout from "./components/Layout/Layout";
// import Products from "./components/Shop/Products";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// // import { uiActions } from "./store/ui-slice";
// import Notification from "./components/UI/Notification";
// import { Fragment } from "react";
// //4.2 import the actionCreator THUNK function
// import { sendCartData } from "./store/cart-slice";


// let isInitial = true;

// function App() {
//   const cart = useSelector((state) => state.cart);
//   const showCart = useSelector((state) => state.ui.cartIsVisible);
//   const notification = useSelector((state) => state.ui.notification);
//   const dispatch = useDispatch();

//   //4.1 move dispatch actions to car Slice
//   useEffect(() => {
    
//     if (isInitial === true) {
//       isInitial = false;
//       return;
//     }
//     //4.3 we always dispatch actions, but here 
//     dispatch(sendCartData(cart))
   
//   }, [cart, dispatch]);

//   return (
//     <Fragment>
//       {notification && (
//         <Notification
//           status={notification.status}
//           title={notification.title}
//           message={notification.message}
//         />
//       )}
//       <Layout>
//         {showCart && <Cart />}
//         <Products />
//       </Layout>
//     </Fragment>
//   );
// }

// export default App;

//4-------------------------------------------------------------------------------------------

//5 thunk action from sepearate file

import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { Fragment } from "react";
//5.2
import { fetchCartData, sendCartData } from "./store/cart-actions";


let isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

//5.1 fetching the initial data from firebase
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() => {
    
    if (isInitial === true) {
      isInitial = false;
      return;
    }
    //5.3
     if (cart.changed) {
      dispatch(sendCartData(cart));
    }
   
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;