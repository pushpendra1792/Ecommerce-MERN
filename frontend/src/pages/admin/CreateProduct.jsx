// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/ProductActions";

const CreateProduct = () => {

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createProductFormHandler = (product) => {
    product.id = nanoid();
    console.log(product);

    dispatch(asyncCreateProduct(product));
    navigate("/products");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-9">Create Product</h1>
      <form
        onSubmit={handleSubmit(createProductFormHandler)}
        className="w-[40%] h-[40%] flex flex-col border-2 py-5 px-5 pt-8"
      >
        <input
          className="w-full outline-0 border-b py-1 px-2"
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title Cannot be empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.title?.message}</small>

        <input
          className="w-full outline-0 border-b py-1 px-2"
          type="number"
          placeholder="Price"
          {...register("price", { required: "Price Cannot be Empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.price?.message}</small>

        <input
          className="w-full mb-7 outline-0 border-b py-1 px-2"
          type="text"
          placeholder="Image URL"
          {...register("image")}
        />

        <select name="category" id="" className="border rounded mb-7 px-3 py-1" {...register("category")}>
            <option defaultValue disabled>All Category</option>
            <option value="electronics">Electronics</option>
            <option value="grocery">Grocery</option>
          </select>

        <textarea
          className="w-full min-h-30 outline-0 border py-1 px-2"
          placeholder="Description"
          {...register("description", { required: "Description Cannot be Empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.description?.message}</small>

        

        <button className="border-2 px-4 py-2 w-[100%] my-3 cursor-pointer">
          Create Product
        </button>
      </form>
    </div>
  )
}

export default CreateProduct