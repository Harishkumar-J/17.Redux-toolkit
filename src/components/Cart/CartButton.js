//1 setting up th e cart click function

import classes from './CartButton.module.css';
// 1.3 import the dispatcher and actions
import { useDispatch} from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {

  //1.4
  const dispatch = useDispatch()
  //1.2 toggle function
  const toggleCartHandler = () =>{
    dispatch(uiActions.toggle())
  }
    
  

  return (
    // 1.1
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
