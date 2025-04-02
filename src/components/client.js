import { createPublicClient, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

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

export const getClient = (network) => {
  return clients[network];
};
