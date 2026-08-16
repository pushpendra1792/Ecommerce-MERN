import { useDispatch, useSelector } from "react-redux";
// import axios from "../api/AxiosConfig";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { asyncLoadProducts } from "../store/actions/ProductActions";

const Products = () => {
  const dispatch = useDispatch();
  
  const fetchData = async () => {
    // const { data } = await axios.get("/product/products?_page=1&_per_page=5");
    await dispatch(asyncLoadProducts());
    console.log(data.data);
  };
  const data  = useSelector((state) => state.productReducers.products);

  useEffect(() => {
    fetchData();
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
