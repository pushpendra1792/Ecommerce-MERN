import axios from "../../api/AxiosConfig";
import { loadproduct } from "../reducers/ProductSlice";

//

export const asyncLoadProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadproduct(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncDeleteProduct = (id) => async (dispatch) =>{
  try {
    await axios.delete("/products/"+id);
    dispatch(asyncLoadProducts());
  } catch (error) {
    console.log(error);
  }
}

export const asyncCreateProduct = (product) => async (dispatch) => {
  try {
    await axios.post("/products", product);
    dispatch(asyncLoadProducts());
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateProduct = (id,product) => async (dispatch) => {
  try {
    await axios.patch("/products/"+id,product);
    dispatch(asyncLoadProducts());
  } catch (error) {
    console.log(error);
  }
};

export const asyncGetProduct = (id) => async () =>{
  const product = await axios.get(`/products/${id}`);
  return product;
}