"use client";
import { CartContext } from "@/contexts/CartContextProvider";
import { SizesContext } from "@/contexts/SizesProvider";
import React, { useContext, useEffect, useState } from "react";
import SizesSelector from "./SizesSelector";
import ItemCount from "./ItemCount";
import { ButtonContainer } from "../buttons/ButtonContainer";
import ShoppingCart from "@/components/atoms/icons/ShopCart";
import ModalAccept from "../Modals/ModalAccept";
import { getItemById } from "@/helpers/getItemById";
import { redirect } from "next/navigation";
import Link from "next/link";

const ItemDetail = ({ item }) => {
  const { sharedSize } = useContext(SizesContext);
  const { cartItems } = useContext(CartContext);

  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({});

  const { addItem } = useContext(CartContext);

  const modalTitle = "Productos Agregados";
  const modalMessage = `Se han agregado: ${count} ${item.name} al carrito de compras`;

  useEffect(() => {
    const itemInit = getItemById(item._id, cartItems);
    if (itemInit !== undefined) {
      const size = itemInit.sizeSelected.find(
        (element) => element.name === sharedSize.name
      );
      setSize(size);
    }
    return () => {
      setSize({});
    };
  }, [cartItems, item._id, sharedSize]);

  const onAdd = (count) => {
    setCount(count);
    addItem(item, count, sharedSize.name);
    setOpenModal(true);
  };

  const endBuy = () => {
    redirect("/cart");
  };

  return (
    <>
      <div className="container">
        <div className="flex flex-col lg:flex-row mx-auto">
          <div className="w-full lg:w-6/12 flex flex-col gap-2 mx-auto">
            <div className="flex justify-center items-center  border-2 rounded-lg p-10">
              {item && <img src={item.img} alt={item.title} width={"50%"} />}
            </div>
          </div>
          <div className="w-full lg:w-6/12 flex flex-col mx-auto px-10 justify-between">
            <div>
              <div className="flex flex-row justify-between items-center">
                {item && (
                  <h1 className="text-purple-500 font-bold text-4xl">
                    {item.title}
                  </h1>
                )}

                <p className="text-lg font-semibold">${item.price}</p>
              </div>
              <p className="text-xl">{item.description}</p>
              <SizesSelector sizes={item.sizes} />
            </div>
            {item && sharedSize && sharedSize.stock >= 0 && (
              <>
                <ItemCount
                  initial={(size && size.peritem) || 0}
                  stock={sharedSize.stock}
                  onAdd={onAdd}
                />
                {count > 0 && (
                  <Link
                    href={"/cart"}
                    className="px-3 py-2 w-max  text-white flex justify-center items-center cursor-pointer bg-purple-600 rounded-full hover:bg-purple-400 disabled:bg-purple-400 "
                  >
                    <ShoppingCart />
                    Finalizar Compra
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ModalAccept
        open={openModal}
        setOpen={setOpenModal}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

export default ItemDetail;
