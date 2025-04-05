// pages/Home.jsx
import React from "react";
import { FaTrophy } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex sticky justify-start  top-0 border-b-[1px] z-[1000] bg-transparent text-white font-poppins border-gray-700 px-4 py-4.5 w-full">
      <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-bold">CryptoLottery</h1>
    </nav>
  );
};

export default Navbar;
