import React from "react";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import EnterRaffle from "../components/enterRaffle";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins bg-black z-[0]">
      <h1 className="text-2xl text-gray-200 font-bold mb-4">Welcome to the Wallet Page</h1>
      <ConnectKitButton />
      <Link to="/dashboard" className="mt-4 text-blue-300">Go to Dashboard</Link>
      <EnterRaffle/>
    </div>
  );
};

export default Home;
