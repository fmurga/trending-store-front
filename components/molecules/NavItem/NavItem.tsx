import Link from "next/link";
import { useState } from "react";

type navItem = {
  id: string;
  link: string;
  name: string;
  subcategories: any[];
};

const NavItem = ({ id, link, name, subcategories }: navItem) => {
  const [open, setOpen] = useState(false);
  let activeClassName =
    "lg:px-6 lg:py-7 bg-indigo-400 flex flex-row items-center justify-between gap-3";

  const toggleSubCategories = () => {
    if (subcategories !== undefined && subcategories.length !== 0) {
      setOpen(true);
    } else {
      return;
    }
  };

  return (
    <li
      className="font-bold hover:text-white group"
      onMouseEnter={() => toggleSubCategories()}
    >
      <Link
        href={link}
        className={
          "lg:px-6 lg:py-7 hover:bg-indigo-400 flex flex-row items-center justify-between gap-3"
        }
      >
        {name}
        {subcategories !== undefined && subcategories.length > 0 && (
          <span className="">
            <svg
              className="fill-current h-4 w-4 transform group-hover:rotate-180 transition duration-150 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        )}
      </Link>
      {open && (
        <ul className="bg-black border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top  min-w-32 w-40">
          {subcategories &&
            subcategories.map((category) => (
              <Link key={category.id} href={`${link}/${category.path}`}>
                <li className="rounded-sm px-3 py-1 hover:bg-indigo-400">
                  {category.name}
                </li>
              </Link>
            ))}
        </ul>
      )}
    </li>
  );
};

export default NavItem;
