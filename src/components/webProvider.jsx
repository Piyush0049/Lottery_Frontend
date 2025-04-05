// Web3Provider.jsx
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, sepolia], // Added Sepolia testnet
    transports: {
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${
          import.meta.env.VITE_ALCHEMY_ID
        }`
      ),
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${
          import.meta.env.VITE_ALCHEMY_ID
        }`
      ),
    },
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    appName: "Your App Name",
    appDescription: "Your App Description",
    appUrl: "http://localhost:5173",
    // appIcon: "https://your-app-url.com/logo.png",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
