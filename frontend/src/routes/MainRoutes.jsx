import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Products from "../pages/Home";
import Orders from "../pages/user/Orders";
import Register from "../pages/Register";
import CreateProduct from "../pages/admin/CreateProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import SingleProduct from "../pages/SingleProduct";
import Dashboard from "../pages/admin/Dashboard";
import Profile from "../pages/Profile";
import Cart from "../pages/user/Cart";
import PageNotFound from "../pages/PageNotFound";
import { useSelector } from "react-redux";
import UpdateUser from "../pages/user/UpdateUser";

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
