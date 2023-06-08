import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContextProvider";

const PaymentDetail = ({ children }) => {
  const { subtotal, total, impuestos } = useContext(CartContext);
  return (
    <div className="flex flex-col gap-2 mt-3">
      <h2 className="text-black border border-x-0 border-t-0 border-b-slate-50 pb-2 font-bold text-xl">
        Detalle de Compra
      </h2>
      <p className="text-gray-500 border border-x-0 border-t-0 border-b-slate-50">
        Subtotal: {subtotal || 0}
      </p>
      <p className="text-gray-500 border border-x-0 border-t-0 border-b-slate-50">
        Impuestos: {impuestos || 0}
      </p>
      <div className="inline-flex justify-between">
        <p className="text-black pt-2 font-bold text-lg">Total: {total || 0}</p>
        {children}
      </div>
    </div>
  );
};

export default PaymentDetail;
