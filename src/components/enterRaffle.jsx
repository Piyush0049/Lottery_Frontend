import React, { useEffect, useState } from "react";
import { abi, contractAddress } from "../constants/index";
import { getClient } from "./client";
import { parseEther } from "viem";
import { ethers } from "ethers";
import { walletClient } from "./client";
import toast from "react-hot-toast";
import { FaEthereum, FaUsers, FaTrophy, FaRocket } from "react-icons/fa";

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
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
      
      <div className="bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Entrance Fee Card */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-blue-500/5 transition-all transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/20 p-3 rounded-lg mr-3">
                <FaEthereum className="text-2xl text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Entrance Fee</h3>
            </div>
            {entranceFee !== null ? (
              <p className="text-xl text-blue-400 font-bold mt-2 flex items-center justify-center">
                <FaEthereum className="mr-2" />
                {ethers.formatUnits(entranceFee)} ETH
              </p>
            ) : (
              <div className="flex justify-center items-center h-10">
                <div className="animate-pulse bg-gray-700 h-6 w-24 rounded"></div>
              </div>
            )}
          </div>
          
          {/* Total Players Card */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-purple-500/5 transition-all transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500/20 p-3 rounded-lg mr-3">
                <FaUsers className="text-2xl text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Total Players</h3>
            </div>
            {totalPlayers !== null ? (
              <p className="text-xl text-purple-400 font-bold mt-2 flex items-center justify-center">
                {totalPlayers} <span className="ml-2">Players</span>
              </p>
            ) : (
              <div className="flex justify-center items-center h-10">
                <div className="animate-pulse bg-gray-700 h-6 w-24 rounded"></div>
              </div>
            )}
          </div>
          
          {/* Latest Winner Card */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-green-500/5 transition-all transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="bg-green-500/20 p-3 rounded-lg mr-3">
                <FaTrophy className="text-2xl text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Latest Winner</h3>
            </div>
            {recentWinner ? (
              <p className="text-xl text-green-400 font-mono mt-2 text-center truncate">
                {recentWinner.substring(0, 7)}...
                {recentWinner.substring(recentWinner.length - 7)}
              </p>
            ) : (
              <div className="flex justify-center items-center h-10">
                <div className="animate-pulse bg-gray-700 h-6 w-36 rounded"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={enterRaffle}
            disabled={isLoading}
            className={`flex items-center px-8 py-4 rounded-xl font-medium text-lg shadow-lg transition-all transform hover:-translate-y-1 ${
              isLoading 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-purple-500/20"
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
              <>
                <FaRocket className="mr-2" /> Enter Raffle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterRaffle;
