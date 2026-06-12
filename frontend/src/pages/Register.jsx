import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { asyncRegisterUser } from "../store/actions/UserActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerHandler = async (user) => {
    user.id = nanoid();
    user.isAdmin = false;

    await dispatch(asyncRegisterUser(user));
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-9">Register</h1>
      <form
        onSubmit={handleSubmit(registerHandler)}
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
          Register
        </button>
        <p className="text-xs block">
          Already Have an Account ?
          <Link to="/login" className="text-blue-600">
            . Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;