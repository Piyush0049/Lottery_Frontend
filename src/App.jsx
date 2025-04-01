// App.jsx
import React from "react";
import {Web3Provider} from "./components/webProvider"
import { ConnectKitButton } from "connectkit";

const App = () => {
  return (
    <Web3Provider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Wallet Page</h1>
        <ConnectKitButton />
      </div>
    </Web3Provider>
  );
};

export default App;
