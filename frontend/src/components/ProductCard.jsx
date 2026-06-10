import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, title, price, description, category, image } = props.product;

  return (
    <Link to={`/product/${id}`} className="w-[19.08%] h-80  p-2 rounded shadow-xl">
      <div className="w-[100%] h-[50%] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[100%] object-contain"
        />
          <span className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm border border-gray-700 capitalize">
            {category}
          </span>
      </div>
      <div className="px-.5 py-3">
        <h2 className="font-bold text-lg group-hover:text-amber-300 transition-colors line-clamp-1">
          {title}
        </h2>
        <p>{description.slice(1, 59)}...</p>
        <h3 className="text-lg">${price}</h3>
        <div className="flex w-full h-full gap-1">
          <button className="border px-4 py-1 w-1/2 cursor-pointer">Add to Cart</button>
          <button className="border w-1/2 cursor-pointer">Buy Now</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
