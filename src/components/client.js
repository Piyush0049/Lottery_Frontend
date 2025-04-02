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

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
});

// JSON-RPC Account
export const [account] = await walletClient.getAddresses();
// Local Account
//   export const account = privateKeyToAccount('0x...')

export const getClient = (network) => {
  return clients[network];
};
