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

//2 USING USEEFFECT WITH REDUX

//2.1
import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  //2.1 working out the cart data
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  //2.2 http call to update the state changes in the backend storage(Firebase realtime database)
  // using PUT method to overwrite the changes
  useEffect(() => {
    fetch(
      "https://shop-cart-redux-3f2e8-default-rtdb.firebaseio.com/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
