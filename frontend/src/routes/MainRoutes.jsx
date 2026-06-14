import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy } from "react";

const Login = lazy(()=>import("../pages/Login"));
const SingleProduct = lazy(()=>import("../pages/SingleProduct"));
const Products = lazy(()=>import("../pages/Home"));
const Orders = lazy(()=>import("../pages/user/Orders"));
const Register = lazy(()=>import("../pages/Register"));
const CreateProduct = lazy(()=>import("../pages/admin/CreateProduct"));
const UpdateProduct = lazy(()=>import("../pages/admin/UpdateProduct"));
const Dashboard = lazy(()=>import("../pages/admin/Dashboard"));
const Profile = lazy(()=>import("../pages/Profile"));
const Cart = lazy(()=>import("../pages/user/Cart"));
const PageNotFound = lazy(()=>import("../pages/PageNotFound"));
const UpdateUser = lazy(()=>import("../pages/user/UpdateUser"));

const MainRoute = () => {
  const user = useSelector((state) => state.usersReducers.users);

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />}>
        {user?.isAdmin ? (
          <Route path="update-product" element={<UpdateProduct />} />
        ) : null}
      </Route>
      <Route path="*" element={<PageNotFound />} />

      {user ? (
        <>
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/update-profile" element={<UpdateUser />} />
          </Route>
          {user?.isAdmin ? (
            <>
              <Route path="/admin/create-product" element={<CreateProduct />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={<Cart />} />
            </>
          )}
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
};

export default MainRoute;
