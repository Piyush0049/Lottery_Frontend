import React, { useEffect, useState } from "react";
import { abi, contractAddress } from "../constants/index";
import { getClient } from "./client";
import { parseEther } from "viem";
import { ethers } from "ethers";
import { walletClient } from "./client";
import toast from "react-hot-toast";

const EnterRaffle = () => {
  const [entranceFee, setEntranceFee] = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [recentWinner, setRecentWinner] = useState("");

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
    try {
      const tx = await walletClient.writeContract({
        abi: abi,
        address: String(contractAddress["11155111"]),
        functionName: "enterRaffle",
        account: "0xCC2a0cd3b5762126C460b73417Fe6a3bD0Ef8beD",
        value: parseEther("0.0008"),
      });
      console.log("Transaction sent:", tx);
      toast.success("You've enterd the lottery!");
    } catch (error) {
      toast.error("Sorry! The transaction has failed.");
      console.error("Error executing contract function:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white font-poppins">
      <div className="flex flex-col md:flex-row gap-3 items-center mt-5">
        <div className="bg-gray-950 shadow-lg rounded-xl p-6 w-80 text-center border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-300">Entrance Fee</h2>
          {entranceFee !== null ? (
            <p className="text-xl text-yellow-400 font-bold mt-2">
              {ethers.formatUnits(entranceFee)} ETH
            </p>
          ) : (
            <p className="text-gray-500 mt-2">Loading entrance fee...</p>
          )}
        </div>
        <div className="bg-gray-950 shadow-lg rounded-xl p-6 w-80 text-center border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-300">Total Players</h2>
          {totalPlayers !== null ? (
            <p className="text-xl text-yellow-400 font-bold mt-2">
              {totalPlayers} Players
            </p>
          ) : (
            <p className="text-gray-500 mt-2">Loading players count...</p>
          )}
        </div>
        <div className="bg-gray-950 shadow-lg rounded-xl p-6 w-80 text-center border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-300">Latest Winner</h2>
          {recentWinner ? (
            <p className="textxl text-green-400 font-mono mt-2">
              {recentWinner.substring(0, 7)}.....
              {recentWinner.substring(
                recentWinner.length - 7,
                recentWinner.length
              )}
            </p>
          ) : (
            <p className="text-gray-500 mt-2">Loading recent winner...</p>
          )}
        </div>
        
      </div>
      <div className="flex flex-col gap-4 mt-5">
          <button
            onClick={enterRaffle}
            className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl hover:cursor-pointer shadow-lg hover:bg-yellow-400 transition-all"
          >
            🚀 Enter Raffle
          </button>
        </div>
    </div>
  );
};

export default EnterRaffle;
