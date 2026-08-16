import axios from "../../api/AxiosConfig";
import { loaduser, removeuser } from "../reducers/UserSlice";
import { toast } from "react-toastify";

export const asyncDeleteUser = () => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    await dispatch(asyncLogoutUser());
    toast.success("Profile Deleted !!");
  } catch {
    toast.error("Deletion Failed !");
  }
};

export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(loaduser(data));
  } catch {
    console.log("Not Logged In !");
  }
};

export const asyncLogoutUser = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeuser());
  } catch {
    toast.success("Logged out !");
  }
};

export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login",user);
    dispatch(loaduser(data.user));
    toast.success("Logged In !");
    return true;
  } catch {
    console.log("Invalid Credentials");
    return false;
  }
};

export const asyncRegisterUser = (user) => async () => {
  try {
    await axios.post("/auth/register", user);
    toast.success("User Registered Successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
  }
};

export const asyncUpdateUser = (data) => async (dispatch) => {
  try {
    await axios.patch("/auth/update-user", data);
    await dispatch(asyncCurrentUser());
  } catch {
    toast.error("Update failed !");
  }
};

export const asyncAddToCart = (productId, quantity=1) => async (dispatch) => {
  try {
    await axios.post("/cart/add", { productId, quantity });
    dispatch(asyncCurrentUser());
    toast.success("Added to cart!");
  } catch {
    toast.error("Failed to add to cart");
  }
};

export const asyncRemoveFromCart = (productId) => async (dispatch) => {
  try {
    await axios.post(`/cart/remove/${productId}`);
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncDeleteProductFromCart = (productId) => async (dispatch) => {
    try {
    await axios.delete(`/cart/delete/${productId}`);
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
  };
