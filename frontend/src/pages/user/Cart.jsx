import { useSelector } from "react-redux";
import CartCard from "../../components/CartCard";

const Cart = () => {
  const user = useSelector((state) => state.usersReducers.users);

  console.log(user.cart);
  const quantity = user?.cart?.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const total = user?.cart?.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  console.log(quantity);
  console.log(total);
  const renderCarts = user?.cart?.map((product) => (
    <CartCard
      key={product.productId}
      productId={product.productId}
      quantity={product.quantity}
    />
  ));

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-start">
        <div className="lg:w-3/4 space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>
          </div>

          <div className="space-y-4">{renderCarts}</div>
        </div>

        <aside className="lg:w-1/4">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>${(total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$00.00</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>$00.00</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon Discount</span>
                <span className="text-emerald-600">- $0.00</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span>${(total).toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
