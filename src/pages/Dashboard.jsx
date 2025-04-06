import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import EnterRaffle from "../components/enterRaffle";
import { FaWallet, FaExclamationTriangle, FaChartLine, FaHistory } from "react-icons/fa";

const Dashboard = () => {
  const [walletInstalled, setWalletInstalled] = useState(true);

  useEffect(() => {
    // Check if MetaMask or WalletConnect-compatible wallets are available
    const isWalletAvailable =
      typeof window.ethereum !== "undefined" ||
      navigator.userAgent.includes("WalletConnect");

    if (!isWalletAvailable) {
      setWalletInstalled(false);
    }
  }, []);

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Dashboard
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Manage your lottery entries and track your winnings
          </p>
        </div>
      </div>

      {/* Wallet Connection Section */}
      <div className="container mx-auto px-4 mb-10">
        <div className="max-w-4xl mx-auto bg-gray-800/30 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700/50 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                <FaWallet className="text-xl sm:text-2xl text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Wallet Connection</h2>
                <p className="text-sm sm:text-base text-gray-400">Connect your wallet to enter raffles</p>
              </div>
            </div>
            
            <div className="transform hover:scale-105 transition-transform">
              <ConnectKitButton />
            </div>
          </div>

          {!walletInstalled && (
            <div className="mt-6 bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-sm text-white px-4 sm:px-6 py-4 rounded-lg flex items-start sm:items-center flex-col sm:flex-row">
              <FaExclamationTriangle className="text-xl mr-0 sm:mr-3 mb-2 sm:mb-0" />
              <div>
                <p className="text-sm sm:text-base">No wallet detected! Please install{" "}
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium hover:text-blue-200 transition-colors"
                  >
                    MetaMask
                  </a>{" "}
                  or a WalletConnect-compatible wallet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 sm:p-8 rounded-xl backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-purple-500/10 transition-all">
            <div className="flex items-center mb-6">
              <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                <FaChartLine className="text-xl sm:text-2xl text-purple-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold">Enter Raffle</h2>
            </div>
            <div className="bg-black/30 p-3 sm:p-6 rounded-lg mb-4 overflow-x-hidden">
              <EnterRaffle />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 text-center">
        <Link 
          to="/" 
          className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
