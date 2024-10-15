export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
export const API_BASE = import.meta.env.BASE_URL;

export const SEPOLIA_PRIVATE_KEY = import.meta.env?.PUBLIC_SEPOLIA_PRIVATE_KEY || "";
export const SEPOLIA_URL = import.meta.env?.PUBLIC_SEPOLIA_URL || "";
export const SEPOLIA_CONTRACT_ADDRESS = import.meta.env?.PUBLIC_SEPOLIA_CONTRACT_ADDRESS || "";
export const MAINNET_CONTRACT_ADDRESS = import.meta.env?.PUBLIC_MAINNET_CONTRACT_ADDRESS || "";
export const CONTRACT_ADDRESS = IS_DEV ? SEPOLIA_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS;
// export const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY') || "";
// export const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL') || "";
