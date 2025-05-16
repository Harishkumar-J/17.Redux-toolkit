import classes from "./CartItem.module.css";
//1.3 mporting the reducer and actions
import cartSlice from "../../store/cart-slice";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  //1.4
  const dispatch = useDispatch();

  // 1.1 handling the + and _ button functions
  //1.5 we have to send the id of the item as a payload
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  //1.6 we have to send the whole item props as payload
  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart({id, title, price}));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          {/* 1.2 */}
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
