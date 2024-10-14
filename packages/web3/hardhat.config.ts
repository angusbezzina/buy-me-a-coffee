import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-viem";
import { SEPOLIA_PRIVATE_KEY, SEPOLIA_URL } from "@repo/constants";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
      chainId: 11155111, // Sepolia Chain ID
    },
    // mainnet: {
    //   url: MAINNET_RPC_URL,
    //   accounts: [MAINNET_PRIVATE_KEY],
    // },
  },
};

export default config;
