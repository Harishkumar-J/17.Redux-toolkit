import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
//1.4
import { useDispatch } from "react-redux";
//1.5
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  const { id,title, price, description } = props;

  //1.3 using redux dispatch
  const dispatch = useDispatch();

  //1.1
  const addToCartHandler = () => {
    //1.5
    dispatch(cartActions.addItemToCart({ id,title, price }));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          {/* 1.2 adding to cart function  */}
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;


//1-------------------------------------------------------
