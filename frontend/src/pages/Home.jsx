import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { asyncLoadProducts } from "../store/actions/ProductActions";

const Products = () => {
  const dispatch = useDispatch();
  
  const fetchData = async () => {
    await dispatch(asyncLoadProducts());
  };
  const data  = useSelector((state) => state.productReducers.products);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProducts = data.map((product) => {
    return <ProductCard product={product} key={product.id} />;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4 px-15">{renderProducts}</div>
    </div>
  );
};

export default Products;
