import React from "react";
import CartItem from "./CartItem";

const CartItemList = ({ items }) => {
  return (
    <div className="container w-7/12 h-full">
      <div className="flex flex-col items-center gap-2">
        {items && items.map((item) => <CartItem key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default CartItemList;
