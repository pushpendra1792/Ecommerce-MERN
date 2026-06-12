import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteUser } from "../store/actions/UserActions";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.usersReducers.users);

  const deleteProfileHandler = () => {
    dispatch(asyncDeleteUser());
    navigate("/");
  };

  const updateProfileHandler = () => {
    navigate("/profile/update-profile");
  };

  return (
    <div className="px-10 py-2">
      <h1 className="text-5xl mb-5">{user.username}</h1>
      <h3 className=" text-2xl mb-5">{user.email}</h3>
      <hr />
      <div className="flex">
        <button
          onClick={updateProfileHandler}
          className="border px-5 py-2 rounded-full bg-blue-300 m-5 cursor-pointer"
        >
          Update Profile
        </button>
        <br />
        <button
          onClick={deleteProfileHandler}
          className="border px-5 m-5 rounded-full bg-red-500  cursor-pointer "
        >
          Delete Account
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;