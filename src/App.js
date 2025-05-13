//1 rendering Cart component  

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

//1.1 import selector and store states
import { useSelector } from 'react-redux';

function App() {
//1.2
  const showCart = useSelector(state => state.ui.cartIsVisible)
  return (
    <Layout>
      {/* 1.3 */}
      { showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
