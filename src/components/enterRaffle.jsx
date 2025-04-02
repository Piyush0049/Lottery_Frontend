import React, { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { abi, contractAddress } from "../constants/index";
import { config } from "./webProvider"; // Import your provider config
import { getClient } from "./client";
import { parseEther } from "viem";
import { ethers } from "ethers";

const EnterRaffle = () => {
  const [entranceFee, setEntranceFee] = useState(null);

  useEffect(() => {
    const fetchEntranceFee = async () => {
      try {
        const result = await getClient("sepolia").readContract({
          abi: abi,
          address: String(contractAddress["11155111"]),
          functionName: "getEntranceFee",
        });
        console.log(result);
        setEntranceFee(result.toString());
      } catch (error) {
        console.error("Error reading contract:", error);
      }
    };
    fetchEntranceFee();
  }, []);

  const fund = async () => {
    try {
      const client = getClient("sepolia");

      const result = await client.readContract({
        abi: abi,
        address: String(contractAddress["11155111"]),
        functionName: "enterRaffle",
        account: "0xCC2a0cd3b5762126C460b73417Fe6a3bD0Ef8beD",
        value: parseEther("0.0008"),
      });

      console.log("Transaction Hash:", result);
    } catch (error) {
      console.error("Error funding raffle:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="sticky top-0 border-b-[1px] z-[1000] bg-black text-white font-poppins border-gray-500 px-3 py-4 w-full">
        <h1 className="text-2xl font-semibold">Raffle Lottery</h1>
      </nav>
      <div className="text-center mt-3">
        <h2 className="text-lg text-white font-semibold">Entrance Fee:</h2>
        {entranceFee !== null ? (
          <p className="text-xl text-yellow-500">
            {ethers.formatUnits(entranceFee)} ETH
          </p>
        ) : (
          <p className="text-red-500">Fetching entrance fee...</p>
        )}
      </div>
      <div className="text-center mt-3">
        <button className="bg-white" onClick={fund}>
          Fund
        </button>
      </div>
    </div>
  );
};

export default EnterRaffle;
