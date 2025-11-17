import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaBlog, FaShoppingCart } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";

const MobileFixMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[9999] md:hidden">
      <div className="flex justify-between px-6 py-3">

        <NavLink
          to="/"
          className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
        >
          <AiFillHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/about"
          className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
        >
          <BsFillInfoCircleFill className="text-2xl" />
          <span className="text-xs">About</span>
        </NavLink>

        <NavLink
          to="/products"
          className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
        >
          <FaShoppingCart className="text-2xl" />
          <span className="text-xs">Shop</span>
        </NavLink>

        <NavLink
          to="/blog"
          className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
        >
          <FaBlog className="text-2xl" />
          <span className="text-xs">Blog</span>
        </NavLink>

        <NavLink
          to="/contact"
          className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
        >
          <MdContactMail className="text-2xl" />
          <span className="text-xs">Contact</span>
        </NavLink>

      </div>
    </div>
  );
};

export default MobileFixMenu;
