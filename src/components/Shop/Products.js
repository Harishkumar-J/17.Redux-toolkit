import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
//1.1 creating the dummy items
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "Book-1",
    description: "First book I ever wrote",
  },
  {
    id: "p2",
    price: 10,
    title: "Book-2",
    description: "Second book I wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {/* 1.2 */}
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
