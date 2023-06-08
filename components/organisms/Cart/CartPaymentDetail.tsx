import PaymentDetail from "@/components/atoms/PaymentDetail";
import CheckOutlined from "@/components/atoms/icons/CheckOutlined";
import Link from "next/link";
import React from "react";

const CartPaymentDetail = () => {
  return (
    <div className="container w-5/12 h-full bg-slate-200 mt-0 pt-6 p-10 m-10 rounded-md">
      <PaymentDetail>
        <Link
          href="/checkout"
          className="px-3 py-2 w-max  text-white flex justify-center items-center cursor-pointer bg-purple-600 rounded-full hover:bg-purple-400 disabled:bg-purple-400 "
        >
          <CheckOutlined />
          Checkout
        </Link>
      </PaymentDetail>
    </div>
  );
};

export default CartPaymentDetail;
