import { mainnet, sepolia } from "viem/chains";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const clients = {
  mainnet: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
  sepolia: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
};

let walletClient = null;
let account = null;

if (typeof window !== "undefined" && window.ethereum) {
  try {
    walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
    walletClient.getAddresses().then((addresses) => {
      if (addresses.length > 0) {
        account = addresses[0];
      } else {
        console.warn("No connected wallet found.");
      }
    });
  } catch (error) {
    console.error("Error initializing wallet client:", error);
  }
} else {
  console.warn("Ethereum provider not found. Please install MetaMask.");
}

export const getClient = (network) => {
  return clients[network] || null;
};

export { walletClient, account };
