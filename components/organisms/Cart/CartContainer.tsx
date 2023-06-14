"use client";

import React, { useContext } from "react";
import CartItemList from "./CartItemList";
import CartPaymentDetail from "./CartPaymentDetail";
import ClearCart from "./ClearCart";
import EmptyCart from "@/components/atoms/EmptyCart";
import { CartContext } from "@/contexts/CartContextProvider";

const CartContainer = () => {
  const { cartItems } = useContext(CartContext);

  if (cartItems && cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Carrito de Compras</h1>
        <ClearCart />
      </div>
      <div className="flex flex-row justify-between mx-20 py-10">
        <CartItemList items={cartItems} />
        <CartPaymentDetail />
      </div>
    </section>
  );
};

export default CartContainer;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
