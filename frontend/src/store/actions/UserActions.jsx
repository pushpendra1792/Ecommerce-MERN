import axios from "../../api/AxiosConfig";
import { loaduser, removeuser } from "../reducers/UserSlice";
import { toast } from "react-toastify";

export const asyncDeleteUser = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.id);
    await axios.delete(`/users/${user.id}`);
    await dispatch(asyncLogoutUser());
    toast.success("Profile Deleted !!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(loaduser(user));
    } else {
      console.log("User not logged in!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncLogoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/users?email=${user.email}`);
    if (data.length > 0) {
      if (data[0].password === user.password) {
        const toStore = JSON.stringify(data[0]);
        localStorage.setItem("user", toStore);
        dispatch(asyncCurrentUser());
        return true;
      }
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncRegisterUser = (user) => async () => {
  try {
    await axios.post("/users", user);
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateUser = (id, data) => async (dispatch) => {
  try {
    await axios.patch(`/users/${id}`, data);
    const d = await axios.get(`/users/${id}`);
    const toStore = JSON.stringify(d.data);
    await localStorage.setItem("user", toStore);
    await dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncAddToCart = (proId, userId) => async (dispatch) => {
  const { data } = await axios.get(`/users/${userId}`);
  const productData = await axios.get(`/products/${proId}`)
  if (data.cart.length > 0) {
    const item = data.cart.find((data) => data.productId == proId);

    //If that item is already present, we just want to increase the quantity
    if (item) {
      item.quantity += 1;
      item.price = productData.data.price;
      await dispatch(asyncUpdateUser(data.id, data));

      // If there is data, but item is not present then i have to add another object
    } else {
      data.cart.push({ productId: proId, quantity: 1, price: productData.data.price });
      await dispatch(asyncUpdateUser(data.id, data));
    }
  } 
  //If the cart is empty 
  else {
    data.cart.push({ productId: proId, quantity: 1, price: productData.data.price  });
    await dispatch(asyncUpdateUser(data.id, data));
  }
};

export const asyncRemoveFromCart = (proId, userId) => async (dispatch) => {
  const { data } = await axios.get(`/users/${userId}`);
  if (data.cart.length > 0) {
    const item = data.cart.find((data) => data.productId == proId);
    
    //If that item is already present, we just want to decrease the quantity
    if (item) {
      item.quantity -= 1;
      await dispatch(asyncUpdateUser(data.id, data));
      await dispatch(asyncCurrentUser());
      
      // If there is data, but item is not present then i have to add another object
    } 
  } 
  //If the cart is empty 
  else {
    return alert("No Product To remove");
  }
};

export const asyncDeleteProductFromCart = (proId,userId) => async  (dispatch) =>{
  try {
    const { data } = await axios.get(`/users/${userId}`);
    const idx = data.cart.findIndex((data) => data.productId == proId);
    data.cart.splice(idx,1);
    console.log(data)
    await dispatch(asyncUpdateUser(data.id, data));
    await dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error)
  }

}