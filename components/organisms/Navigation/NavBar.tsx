"use client";

import { CartContext } from "@/contexts/CartContextProvider";
import Link from "next/link";
import icon from "../../../images/trending-icon.png";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import NavItem from "@/components/molecules/NavItem/NavItem";
import CartWidget from "@/components/atoms/CartWidget";
import LoginWidget from "@/components/atoms/LoginWidget";
import Menu from "@/components/atoms/icons/Menu";

const NavBar = ({ json }) => {
  const [openNav, setOpenNav] = useState(false);
  const { itemCount } = useContext(CartContext);

  return (
    <nav className="sticky w-full z-10 top-0 flex flex-wrap items-center justify-between px-2 py-0 bg-black">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <Image
              className="max-w-sm"
              src={icon}
              alt="Ecommerce Icon"
              width={100}
              height={100}
            />
          </Link>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setOpenNav(!openNav)}
          >
            <Menu />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center justify-center" +
            (openNav ? " flex" : " hidden")
          }
        >
          <ul className="flex flex-col items-center lg:flex-row list-none lg:ml-0 text-white">
            {json.links &&
              json.links.map((link: any) => (
                <NavItem
                  key={link._id}
                  id={link._id}
                  link={link.path}
                  name={link.name}
                  subcategories={link.subcategories}
                />
              ))}
            {openNav && (
              <li className="my-3 lg:hidden xl:hidden flex flex-row items-center justify-between gap-1">
                <CartWidget itemCount={itemCount} />
                <LoginWidget />
              </li>
            )}
          </ul>
        </div>
        <div className="right hidden lg:flex lg:flex-row items-center justify-between gap-1">
          <CartWidget itemCount={itemCount} />
          <LoginWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
