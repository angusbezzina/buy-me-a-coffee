export const IS_DEV = process.env.NODE_ENV !== "production";
export const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";
export const SEPOLIA_URL = process.env.SEPOLIA_URL || "";
export const SEPOLIA_CONTRACT_ADDRESS = process.env.SEPOLIA_CONTRACT_ADDRESS || "";
export const MAINNET_CONTRACT_ADDRESS = process.env.MAINNET_CONTRACT_ADDRESS || "";
export const CONTRACT_ADDRESS = IS_DEV ? SEPOLIA_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS;
// export const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY') || "";
// export const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL') || "";
