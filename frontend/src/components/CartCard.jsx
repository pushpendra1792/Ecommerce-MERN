import { useDispatch, useSelector } from "react-redux";
import { asyncGetProduct } from "../store/actions/ProductActions";
import { useEffect, useState } from "react";
import { asyncAddToCart , asyncDeleteProductFromCart, asyncRemoveFromCart } from "../store/actions/UserActions";
import close from "../assets/close.png"

const CartCard = ({ productId, quantity }) => {
  const [data, setdata] = useState({});
  const dispatch = useDispatch();

  const user = useSelector(state => state.usersReducers.users);
  

  useEffect(() => {
    const getData = async () => {
      const pro = await dispatch(asyncGetProduct(productId));
      setdata(pro);
    };
    getData();
  }, [dispatch, productId]);

  const removeItemCartBtnHandler = async () =>{
    if(quantity>1){
        await dispatch(asyncRemoveFromCart(data?.data?.id,user?.id));
    }
    else if(quantity==1){
        await dispatch(asyncDeleteProductFromCart(data?.data?.id,user?.id));
    }
}

const addItemCartBtnHandler = async () =>{
      await dispatch(asyncAddToCart(data?.data?.id,user?.id));
  }

  const directDelete = async () =>{
    await dispatch(asyncDeleteProductFromCart(data?.data?.id,user?.id));
  }

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex gap-4">
        <div onClick={directDelete} className="w-5 mx-3 flex justify-center items-center cursor-pointer"> <img src={close} alt="" /></div>
          <div className="h-24 w-24 overflow-hidden rounded-[24px] bg-slate-100">
            <img
              src={data?.data?.image}
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-base font-semibold text-slate-900">{data?.data?.title}</h3>
            <p className="text-sm text-slate-500">Category : {data?.data?.category}</p>
          </div>
        </div>

        <div className="col-span-2 text-center text-sm font-semibold text-slate-900">
          $ {data?.data?.price}
        </div>

        <div className="col-span-2 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <button onClick={removeItemCartBtnHandler} className="h-8 w-8 cursor-pointer rounded-full bg-white text-slate-600">-</button>
            <span className="min-w-[24px] text-center text-sm font-semibold text-slate-900">
              {quantity}
            </span>
            <button onClick={addItemCartBtnHandler} className="h-8 w-8 cursor-pointer rounded-full bg-white text-slate-600">+</button>
          </div>
        </div>

        <div className="col-span-2 text-center text-sm font-semibold text-slate-900">
          $ {((data?.data?.price)*quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
