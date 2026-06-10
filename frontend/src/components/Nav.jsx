import { NavLink } from "react-router-dom";
import { asyncLogoutUser } from "../store/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import monitor from "../assets/monitor.png";
import orders from "../assets/orders.png";
import profile from "../assets/profile.png";
import logout from "../assets/logout.png";

const Nav = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = useSelector(state => state.usersReducers.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutBtnHandler = async () => {
    await dispatch(asyncLogoutUser());
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="w-[100%] h-[100%] bg-white flex gap-3 px-15 py-3 border-b">
        <div className="flex justify-center items-center w-[10%]">
          <NavLink to="/" className="w-full h-full">
            <img
              src={logo}
              alt="Buynix logo"
              className="w-full h-full object-cover"
            />
          </NavLink>
        </div>
        <div className="flex items-center overflow-hidden rounded-lg border border-[#4697FFFF] w-[65%] m-0 p-0">
          <input
            type="text"
            placeholder="Find Product"
            className="h-full flex-1 py-1 px-3 bg-white outline-0"
          />
          <div className="h-[70%] w-px flex mt-1 bg-gray-300"></div>
          <div className="w-40">

          <select
            name="category"
            id=""
            className="h-full bg-white  px-4 outline-0 border-0"
            >
            <option value="" className="p-3">
              All Category
            </option>
            <option value="">Electronics</option>
            <option value="">Grocery</option>
          </select>
            </div>
          <button className="h-full text-white px-7 py-1 cursor-pointer rounded-r-sm bg-[#4697FFFF] border-0">
            Search
          </button>
        </div>
        <div className="flex gap-5 justify-end items-center w-[25%] px-5">
         
          {user ? (
            <>
              <NavLink to="/profile">
                <div className="object-contain w-10 flex justify-center items-center flex-col">
                  <img className="w-5 h-full mb-1" src={profile} alt="" />
                  <h1 className="text-center text-xs">Profile</h1>
                </div>
              </NavLink>
              {user?.isAdmin ? (
                <>
                  <NavLink to="/admin/dashboard">
                    <div className="object-contain w-10 flex justify-center items-center flex-col">
                      <img className="w-5 h-full mb-1" src={monitor} alt="" />
                      <h1 className="text-center text-xs">Dashboard</h1>
                    </div>
                  </NavLink>
                  {/* Create Profile wala Route hataya h usko Dashboard me integrate krna h */}
                </>
              ) : (
                <>
                  <NavLink to="/orders">
                    <div className="object-contain w-10 flex justify-center items-center flex-col">
                      <img className="w-5 h-full mb-1" src={orders} alt="" />
                      <h1 className="text-center text-xs">Orders</h1>
                    </div>
                  </NavLink>
                  <NavLink to="/cart">
                    <div className="object-contain w-10 flex justify-center items-center flex-col">
                      <img className="w-5 h-full mb-1" src={cart} alt="" />
                      <h1 className="text-center text-xs">Cart</h1>
                    </div>
                  </NavLink>
                </>
              )}
              <button onClick={logoutBtnHandler} className="cursor-pointer">
                <div className="object-contain w-10 flex justify-center items-center flex-col">
                  <img className="w-5 h-full mb-1" src={logout} alt="" />
                  <h1 className="text-center text-xs">Logout</h1>
                </div>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <div className="object-contain w-10 flex justify-center items-center flex-col">
                  <img className="w-5 h-full mb-1" src={logout} alt="" />
                  <h1 className="text-center w-full text-xs">Sign In</h1>
                </div>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;