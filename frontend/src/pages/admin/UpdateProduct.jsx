import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { asyncUpdateProduct } from "../../store/actions/ProductActions";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const closeModal = () => navigate(`/product/${id}`);

  const products = useSelector((state) => state.productReducers.products);
  const product = products.find((item) => id === item.id);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      title: product?.title,
      price: product?.price,
      image: product?.image,
      category: product?.category,
      description: product?.description,
    },
  });

  const updateProductFormHandler = (product) => {
    console.log(product);

    dispatch(asyncUpdateProduct(id, product));

    navigate("/product/" + id);
  };

  return product ? (
    <div className="w-full max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Update Product</h1>
        <button
          type="button"
          onClick={closeModal}
          className="rounded-full border px-3 py-1 text-sm hover:bg-gray-100"
        >
          Close
        </button>
      </div>

      <form
        onSubmit={handleSubmit(updateProductFormHandler)}
        className="w-full flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-xl"
      >
        <input
          className="w-full outline-0 border-b py-2 px-3 mb-5"
          type="text"
          placeholder="Title"
          {...register("title")}
        />

        <input
          className="w-full outline-0 border-b py-2 px-3 mb-5"
          type="number"
          placeholder="Price"
          {...register("price")}
        />

        <input
          className="w-full outline-0 border-b py-2 px-3 mb-5"
          type="text"
          placeholder="Image URL"
          {...register("image")}
        />

        <select
          name="category"
          className="border rounded px-3 py-2 mb-5"
          {...register("category")}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="electronics">Electronics</option>
          <option value="grocery">Grocery</option>
        </select>

        <textarea
          className="w-full min-h-[120px] outline-0 border py-2 px-3 mb-5 resize-none"
          placeholder="Description"
          {...register("description")}
        />

        <button className="rounded-2xl bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700">
          Update Product
        </button>
      </form>
    </div>
  ) : (
    "Loading...."
  );
};

export default UpdateProduct;
