import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import Link from "next/link";
import { CartContext } from "@/contexts/CartContextProvider";
import Close from "@/components/atoms/icons/Close";

const CartItem = ({ item }: any) => {
  const { addItem, removeItem } = useContext(CartContext);
  const [selectedValue, setSelectedValue] = useState<number>(item.quantity);
  const [selectOptions, setSelectOptions] = useState<any>();
  const options = () => {
    let aux: any = [];
    for (let i = 1; i <= 6; i++) {
      aux = [...aux, { value: i, label: i }];
    }
    return aux;
  };

  const handleSelectChange = (selectedValue: any) => {
    setSelectedValue(selectedValue);
    addItem(item, selectedValue.value);
  };

  useEffect(() => {
    setSelectOptions(options());
  }, []);

  return (
    <>
      {item.sizeSelected.map((size: any) => (
        <div
          key={size.name}
          className="flex justify-between w-5/6 h-40 border-y-slate-400 shadow-md rounded-lg hover:scale-105 transition duration-100 p-2"
        >
          <div className="inline-flex gap-2">
            <img
              className="rounded-lg"
              src={item.img}
              alt={item.name}
              width={100}
            />
            <div>
              <Link href={`/item/${item._id}`}>
                <h2 className="text-purple-600 font-bold text-md">
                  {item.name}
                </h2>
              </Link>
              <p className="text-lg font-semibold">
                Talle: <span className="font-normal">{size.name}</span>
              </p>
              <p className="text-md font-semibold">${item.price}</p>
            </div>
          </div>
          <div>
            <Select
              onChange={handleSelectChange}
              options={selectOptions}
              getOptionValue={(option: any) => option.value}
              getOptionLabel={(option: any) => option.label}
              value={selectedValue}
              placeholder={size.peritem}
              isDisabled
            />
          </div>
          <div>
            <button
              onClick={() => removeItem(item._id, size.name)}
              type="button"
              className="bg-white rounded-full p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Close />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
