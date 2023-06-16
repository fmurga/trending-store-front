"use client";
import React, { createContext, useEffect, useRef, useState } from "react";

export const CartContext = createContext<any | null>([]);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [impuestos, setImpuestos] = useState<number>(0);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState<boolean>(false);

  const itemsRef = useRef(cartItems);

  const addItem = (item: any, quantity: number, selectedSize: string) => {
    if (isInCart(item._id)) {
      const aux: any = cartItems.find((prod: any) => prod._id === item._id);
      const newCartItems: any = cartItems.filter(
        (prod: any) => prod._id !== item._id
      );
      const isSize = aux.sizeSelected.filter(
        (size: any) => size.name === selectedSize
      );
      if (isSize.length === 0) {
        const auxSize = { name: selectedSize, peritem: quantity };
        aux.sizeSelected.push(auxSize);
      } else {
        isSize.peritem = isSize.peritem + quantity;
      }
      setCartItems([...newCartItems, aux]);
    } else {
      item.quantity = quantity;
      item.sizeSelected = [];
      const auxSize = { name: selectedSize, peritem: quantity };
      item.sizeSelected.push(auxSize);
      setCartItems([...cartItems, item]);
    }
  };

  const removeItem = (itemId: number, sizeName: string) => {
    const aux = cartItems.find((item: any) => item._id === itemId);
    if (aux.sizeSelected.length > 1) {
      const size = aux.sizeSelected.find((item: any) => item.name === sizeName);

      const index = aux.sizeSelected.indexOf(size);
      if (index > -1) {
        aux.sizeSelected.splice(index, 1); // 2nd parameter means remove one item only
      }
      setCartItems([...cartItems]);
    } else {
      const newCartItems = cartItems.filter((item: any) => item._id !== itemId);
      setCartItems([...newCartItems]);
    }
  };

  const modifyCartItemQuantity = (
    itemId: number,
    newQuantity: number
  ): void => {
    const aux = cartItems.find((prod: any) => prod._id === itemId);
    const newCartItems = cartItems.filter((prod: any) => prod._id !== itemId);
    aux.quantity = newQuantity;
    setCartItems([...newCartItems, aux]);
  };

  const clear = () => {
    setCartItems([]);
  };

  const isInCart = (itemId: number) => {
    let i;
    for (i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === itemId) {
        return true;
      }
    }
    return false;
  };

  const calcSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item: any) => {
      subtotal = subtotal + item.quantity * item.price;
    });
    setSubtotal(subtotal);
  };

  const calcImpuestos = () => {
    let impuestos = 0;
    cartItems.forEach((item: any) => {
      impuestos = impuestos + item.quantity * item.price * 0.21;
    });
    setImpuestos(impuestos);
  };

  const calcTotal = () => {
    setTotal(impuestos + subtotal);
  };

  const addLocalItems = (item: any) => {
    if (Array.isArray(item)) {
      setCartItems([...itemsRef.current, ...item]);
    } else {
      setCartItems([...itemsRef.current, item]);
    }
  };

  useEffect(() => {
    const totalInCart = () => {
      return cartItems.reduce((acc: number, prod: any) => {
        let aux = 0;
        prod.sizeSelected.forEach((element: any) => {
          aux = aux + element.peritem;
        });
        return (acc = acc + aux);
      }, 0);
    };
    setItemCount(totalInCart());
  }, [cartItems]);

  useEffect(() => {
    calcSubtotal();
    calcImpuestos();
    calcTotal();
  });

  useEffect(() => {
    //@ts-ignore
    let prev_items = JSON.parse(localStorage.getItem("cart")) || [];
    addLocalItems(prev_items);
    setIsInitiallyFetched(true);
  }, []);

  useEffect(() => {
    if (isInitiallyFetched) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitiallyFetched]);

  return (
    <CartContext.Provider
      value={{
        //@ts-ignore
        addItem,
        removeItem,
        clear,
        itemCount,
        cartItems,
        modifyCartItemQuantity,
        total,
        subtotal,
        impuestos,
        addLocalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
