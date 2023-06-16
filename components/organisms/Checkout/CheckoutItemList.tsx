import React from "react";
import CheckoutItem from "./CheckoutItem";

const CheckoutItemList = ({ items }) => {
  return (
    <div className="container w-7/12 h-full">
      <div className="flex flex-col items-center gap-2">
        {items &&
          items.map((item: any) => <CheckoutItem key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default CheckoutItemList;
