import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../../store/actions/UserActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.usersReducers.users.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      username:user?.username,
      email:user?.email,
      password:user?.password
    }
  });

  
  const updateHandler = async (data) => {
    await dispatch(asyncUpdateUser(data));
    toast.success("Profile Updated !");
    navigate("/profile");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-9">Update Profile</h1>
      <form
        onSubmit={handleSubmit(updateHandler)}
        className="w-[40%] h-[40%] flex flex-col border-2 py-5 px-5 pt-8"
      >
        <input
          className="w-full outline-0 border-b py-1 px-2"
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username Cannot be empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.username?.message}</small>

        <input
          className="w-full outline-0 border-b py-1 px-2"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email Cannot be Empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.email?.message}</small>

        <input
          className="w-full outline-0 border-b py-1 px-2"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password Cannot be Empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.password?.message}</small>

        <button className="border-2 px-4 py-2 w-[20%] my-3 cursor-pointer">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;