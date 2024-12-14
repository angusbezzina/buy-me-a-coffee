import { mainnet, sepolia } from "wagmi/chains";

export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
export const API_BASE = import.meta.env.BASE_URL;
export const PROJECT_ID = import.meta.env.PUBLIC_PROJECT_ID || "";
export const SEPOLIA_URL = import.meta.env.PUBLIC_SEPOLIA_URL || "";
export const SEPOLIA_CONTRACT_ADDRESS = import.meta.env.PUBLIC_SEPOLIA_CONTRACT_ADDRESS || "";
export const MAINNET_URL = import.meta.env.PUBLIC_MAINNET_URL || "";
export const MAINNET_CONTRACT_ADDRESS = import.meta.env.PUBLIC_MAINNET_CONTRACT_ADDRESS || "";
export const OWNER_ADDRESS = import.meta.env.PUBLIC_OWNER_ADDRESS || "";
export const ACTIVE_CHAIN = IS_PROD ? mainnet : sepolia;
export const CONTRACT_ADDRESS = IS_PROD ? MAINNET_CONTRACT_ADDRESS : SEPOLIA_CONTRACT_ADDRESS;
export const GIPHY_API_KEY = import.meta.env.PUBLIC_GIPHY_API_KEY || "";
export const GIPHY_RANDOM_GIF_URL = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`;
export const GIPHY_GIF_BY_ID_URL = `https://api.giphy.com/v1/gifs/[id]?api_key=${GIPHY_API_KEY}`;
