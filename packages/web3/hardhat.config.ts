import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-viem";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY || ""}`],
    },
    // mainnet: {
    //   url: MAINNET_RPC_URL,
    //   accounts: [MAINNET_PRIVATE_KEY],
    // },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
};

export default config;
