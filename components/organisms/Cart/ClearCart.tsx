import React, { useContext } from "react";
import { ButtonContainer } from "../buttons/ButtonContainer";
import { CartContext } from "@/contexts/CartContextProvider";
import Delete from "@/components/atoms/icons/Delete";

const ClearCart = () => {
  const { clear } = useContext(CartContext);
  return (
    <ButtonContainer onClick={() => clear()}>
      <Delete /> Vaciar Carrito
    </ButtonContainer>
  );
};

export default ClearCart;
