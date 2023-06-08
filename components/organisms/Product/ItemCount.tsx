import React, { useEffect, useState } from "react";
import ShoppingCart from "@/components/atoms/icons/ShopCart";
import { ButtonContainer } from "../buttons/ButtonContainer";
import Remove from "@/components/atoms/icons/Remove";
import Add from "@/components/atoms/icons/Add";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(0);
  const [disableDec, setDisableDec] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);

  const add = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setCount(initial);
  }, [initial]);

  useEffect(() => {
    if (count === 0) {
      setDisableDec(true);
      setDisableAdd(false);
    }
    if (count === stock) {
      setDisableDec(false);
      setDisableAdd(true);
    }
    if (count > 0) {
      setDisableDec(false);
    }
    if (count < stock) {
      setDisableAdd(false);
    }
  }, [disableAdd, disableDec, count, stock]);

  return (
    <div className="flex flex-col lg:flex-row gap-3 items-center bottom-0 relative">
      <span className="text-xs text-gray-600">Stock: {stock}</span>
      <div className="flex flex-row gap-2 justify-between my-3">
        <ButtonContainer onClick={decrement} disable={disableDec}>
          <Remove />
        </ButtonContainer>
        <label className="text-center pt-2 w-44 bg-slate-200 rounded-lg">
          {count}
        </label>
        <ButtonContainer onClick={add} disable={disableAdd}>
          <Add />
        </ButtonContainer>
      </div>
      <button
        className="inline-flex justify-evenly w-full lg:w-2/12 p-2 bg-purple-600 hover:bg-purple-400 text-white font-bold rounded-lg disabled:bg-purple-400"
        onClick={() => onAdd(count)}
        disabled={stock === 0 || count === 0}
      >
        <ShoppingCart /> Agregar
      </button>
    </div>
  );
};

export default ItemCount;
