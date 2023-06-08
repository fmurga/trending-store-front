import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-full">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-blue-600 text-7xl">Carrito Vacio</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Aun no hay productos
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              Busca y agrega productos a tu carrito
            </p>
            <Link
              to="/"
              className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100">
              Volver a Inicio
            </Link>
          </div>
          <div className="mt-4">
            <img
              src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?resize=603%2C288&ssl=1"
              alt="img"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
