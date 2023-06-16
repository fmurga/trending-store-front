import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className="flex flex-col justify-center items-center w-80 py-5 m-2 border-2 rounded-lg gap-2 shadow-md hover:shadow-xl">
      <a href="_" className="">
        <h2 className="text-purple-600 font-bold text-lg hover:text-purple-400">
          {item.name}
        </h2>
      </a>
      <hr className="text-gray-500" />
      <div className="flex h-60 w-auto">
        <img className="object-contain" src={item.img} alt={item.name} />
      </div>
      <p className="text-center text-violet-700 font-bold">${item.price}</p>
      <Link
        to={`/item/${item._id}`}
        className="w-7/12 p-2 text-center bg-purple-600 hover:bg-purple-400 text-white font-bold rounded-lg"
      >
        Ver Producto
      </Link>
    </div>
  );
};

export default Item;
