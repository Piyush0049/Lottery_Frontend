// pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins bg-black z-[0]">
      <h1 className="text-2xl text-gray-200 font-bold mb-4">Dashboard</h1>
      <Link to="/" className="text-blue-300">
        Go back Home
      </Link>
    </div>
  );
};

export default Dashboard;
