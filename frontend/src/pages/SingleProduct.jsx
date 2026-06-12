import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { asyncDeleteProduct } from "../store/actions/ProductActions";
import { asyncAddToCart } from "../store/actions/UserActions";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";

const SingleProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isModalOpen = useMatch("/product/:id/update-product");
  const products = useSelector((state) => state.productReducers.products);
  const user = JSON.parse(localStorage.getItem("user"));
  const product = products.find((item) => item.id === id);

  const updateProductBtnHandler = () => {
    navigate(`/product/${product.id}/update-product`);
  };
  const deleteProductBtnHandler = () => {
    try {
      dispatch(asyncDeleteProduct(id));
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  const addToCartBtnHandler = async () => {
    await dispatch(asyncAddToCart(id,user.id));
    toast.success("Added to Cart !!");
    navigate('/cart')
  };
  const buyNowBtnHandler = () => {
    toast.success("Order Placed !!");
  };

  if (!product) {
    return (
      <div className="px-15 py-10 text-center text-gray-600">
        No Product Found...
      </div>
    );
  }

  return (
    <div className="relative min-h-full">
      <div className={`${isModalOpen ? "blur-sm" : ""} flex px-15`}>
        <div className="w-1/2 border rounded p-5 flex justify-center items-center">
          <img
            className="object-contain w-90"
            src={product.image}
            alt={product.title || "Product image"}
          />
        </div>
        <div className="w-1/2 border p-5 rounded">
          <div>
            <h1 className="text-3xl mb-4">{product.title}</h1>
            <p className="mb-4">{product.description}</p>
            <hr />
            <h2 className="text-2xl my-4">${product.price}</h2>

            {user?.isAdmin ? (
              <>
                <button
                  onClick={updateProductBtnHandler}
                  className="border px-4 py-2 cursor-pointer mr-4"
                >
                  Update Product
                </button>
                <button
                  onClick={deleteProductBtnHandler}
                  className="border px-4 py-2 cursor-pointer"
                >
                  Delete Product
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={buyNowBtnHandler}
                  className="border px-4 py-2 mr-4 cursor-pointer"
                >
                  Buy Now
                </button>
                <button
                  onClick={addToCartBtnHandler}
                  className="border px-4 py-2 mr-4 cursor-pointer"
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 mt-10 z-40 flex items-center justify-center bg-black/50 p-5">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
            <Outlet />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleProduct;
