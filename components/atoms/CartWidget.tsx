import Link from "next/link";
import ShoppingCart from "./icons/ShopCart";

const CartWidget = ({ itemCount }) => {
  return (
    <button className="px-4 py-2 my-2 font-bold text-white hover:text-white hover:bg-slate-400 hover:rounded-full">
      <Link
        href="/cart"
        className="inline-flex justify-between text-center items-center"
      >
        <p className="mr-1">{itemCount}</p>
        <ShoppingCart />
      </Link>
    </button>
  );
};

export default CartWidget;
