import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Products = () => {
  
  const product = useSelector((state) => state.productReducers.products);

  const renderProducts = product.map((product) => {
    return <ProductCard product={product} key={product.id} />;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4 px-15">{renderProducts}</div>
    </div>
  );
};

export default Products;
