import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import EnterRaffle from "../components/enterRaffle";

const Home = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins bg-black z-[0]">
      <h1 className="text-2xl text-gray-200 font-bold mb-4">
        Welcome to the Wallet Page
      </h1>

      {!walletInstalled && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-md mb-4">
          ⚠ No wallet detected! Please install{" "}
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            MetaMask
          </a>{" "}
          or a WalletConnect-compatible wallet.
        </div>
      )}
      {/* {walletInstalled && <ConnectKitButton />} */}
      <ConnectKitButton />
      <EnterRaffle />
      <Link to="/dashboard" className="mt-4 text-blue-300">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;
