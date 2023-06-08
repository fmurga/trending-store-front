import Link from "next/link";
import icon from "../../../images/trending-icon.png";
import FooterLinksContainer from "./FooterLinksContainer";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-black bottom-0 pb-6">
      <div
        className="container flex flex-col flex-wrap px-4 py-16 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap
      "
      >
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link
            href="/"
            className=" flex items-center justify-center text-4xl font-bold text-blue-700 md:justify-start"
          >
            <Image
              className="max-w-sm"
              src={icon}
              alt="Ecommerce Icon"
              width={100}
              height={100}
            />
          </Link>
          <p className="mt-2 text-sm text-justify text-white font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            at sequi cum, impedit fuga in placeat illo eum minima possimus est
            perferendis distinctio explicabo eos natus consequuntur blanditiis
            odio optio?
          </p>
          <div className="flex mt-4">
            <input
              type="text"
              className=" h-auto p-2 text-sm border border-grey-light round text-grey-dark"
              placeholder="Your email address"
            />
            <button className="h-auto p-3 text-xs text-white bg-red-600 rounded-sm">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center mt-4 lg:mt-2">
            <Link href="/">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 text-blue-600"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>
            <Link href="/" className="ml-3">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 text-blue-300"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </Link>
            <Link href="/" className="ml-3">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 text-pink-400"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>
            <Link href="/" className="ml-3">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-6 h-6 text-blue-500"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </Link>
          </div>
        </div>
        <FooterLinksContainer />
      </div>
      <div className="flex justify-center -mt-12">
        <p className="text-base text-gray-400">
          All rights reserved by @ company 2021
        </p>
      </div>
    </footer>
  );
};

export default Footer;
