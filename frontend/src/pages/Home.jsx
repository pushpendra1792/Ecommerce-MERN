import { useSelector } from "react-redux";
import axios from "../api/AxiosConfig";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";

const Products = () => {
  const product = useSelector((state) => state.productReducers.products);


  const fetchData = async () =>{
    const {data} = await axios.get("/products?_page=1&_per_page=5");
    console.log(data.data);
  }


  useEffect(() => {
    fetchData();
  }, []);

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
