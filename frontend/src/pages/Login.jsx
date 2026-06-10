import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/UserActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginHandler = async (user) => {
    const isLoggedIn = await dispatch(asyncLoginUser(user));
    if (isLoggedIn) {
      toast.success("Logged in sucessfully");
      navigate("/");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-9">Login</h1>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-[40%] h-[40%] flex flex-col border-2 py-5 px-5 pt-8"
      >
        <input
          className="w-full outline-0 border-b py-1 px-2 "
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email Cannot be empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.email?.message}</small>
        <input
          className="w-full outline-0 border-b py-1 px-2"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password Cannot be empty" })}
        />
        <small className="mb-7 text-red-400">{errors?.password?.message}</small>

        <button className="border-2 px-4 py-2 w-[20%] my-3 cursor-pointer">
          Login
        </button>
        <p className="text-xs block">
          Don't Have an Account ?
          <Link to="/register" className="text-blue-600">
            . Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
