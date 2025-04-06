import React, { useEffect, useState } from "react";
import { abi, contractAddress } from "../constants/index";
import { getClient } from "./client";
import { parseEther } from "viem";
import { ethers } from "ethers";
import { walletClient } from "./client";
import toast from "react-hot-toast";
import { FaEthereum, FaUsers, FaTrophy } from "react-icons/fa";

const EnterRaffle = () => {
  const [entranceFee, setEntranceFee] = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [recentWinner, setRecentWinner] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEntranceFee = async () => {
      try {
        const result = await getClient("sepolia").readContract({
          abi: abi,
          address: String(contractAddress["11155111"]),
          functionName: "getEntranceFee",
        });
        setEntranceFee(result.toString());
      } catch (error) {
        console.error("Error reading contract:", error);
      }
    };

    const getRecentWinner = async () => {
      try {
        const result = await getClient("sepolia").readContract({
          abi: abi,
          address: String(contractAddress["11155111"]),
          functionName: "getRecentWinner",
        });
        setRecentWinner(result.toString());
      } catch (error) {
        console.error("Error reading contract:", error);
      }
    };

    const getAllPlayersCount = async () => {
      try {
        const result = await getClient("sepolia").readContract({
          abi: abi,
          address: String(contractAddress["11155111"]),
          functionName: "getAllPlayersCount",
        });
        setTotalPlayers(Number(result));
      } catch (error) {
        console.error("Error reading contract:", error);
      }
    };
    getAllPlayersCount();
    getRecentWinner();
    fetchEntranceFee();
  }, []);

  const enterRaffle = async () => {
    setIsLoading(true);
    try {
      const tx = await walletClient.writeContract({
        abi: abi,
        address: String(contractAddress["11155111"]),
        functionName: "enterRaffle",
        account: "0xCC2a0cd3b5762126C460b73417Fe6a3bD0Ef8beD",
        value: parseEther("0.0008"),
      });
      console.log("Transaction sent:", tx);
      toast.success("You've entered the lottery!");
    } catch (error) {
      toast.error("Sorry! The transaction has failed.");
      console.error("Error executing contract function:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white font-poppins">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Entrance Fee Card */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 shadow-lg rounded-xl p-5 text-center border border-gray-700/50">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-blue-500/20 p-2 rounded-lg mr-2">
              <FaEthereum className="text-xl text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-300">Entrance Fee</h2>
          </div>
          {entranceFee !== null ? (
            <p className="text-xl text-blue-400 font-bold mt-2">
              {ethers.formatUnits(entranceFee)} ETH
            </p>
          ) : (
            <p className="text-gray-500 mt-2">Loading entrance fee...</p>
          )}
        </div>
        
        {/* Total Players Card */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 shadow-lg rounded-xl p-5 text-center border border-gray-700/50">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-purple-500/20 p-2 rounded-lg mr-2">
              <FaUsers className="text-xl text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-300">Total Players</h2>
          </div>
          {totalPlayers !== null ? (
            <p className="text-xl text-purple-400 font-bold mt-2">
              {totalPlayers} Players
            </p>
          ) : (
            <p className="text-gray-500 mt-2">Loading players count...</p>
          )}
        </div>
        
        {/* Latest Winner Card */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 shadow-lg rounded-xl p-5 text-center border border-gray-700/50 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-green-500/20 p-2 rounded-lg mr-2">
              <FaTrophy className="text-xl text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-300">Latest Winner</h2>
          </div>
          {recentWinner ? (
            <p className="text-lg text-green-400 font-mono mt-2 truncate px-2">
              {recentWinner.substring(0, 6)}...
              {recentWinner.substring(recentWinner.length - 6)}
            </p>
          ) : (
            <p className="text-gray-500 mt-2">Loading recent winner...</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 w-full flex justify-center">
        <button
          onClick={enterRaffle}
          disabled={isLoading}
          className={`flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all w-full sm:w-auto ${
            isLoading 
              ? "bg-gray-600 cursor-not-allowed" 
              : "bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-purple-500/20 transform hover:-translate-y-1"
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "🚀 Enter Raffle"
          )}
        </button>
      </div>
    </div>
  );
};

export default EnterRaffle;
