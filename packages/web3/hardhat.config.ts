import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-viem";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const { SEPOLIA_PRIVATE_KEY = "", SEPOLIA_URL = "" } = process.env;

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
