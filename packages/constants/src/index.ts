import type { Astro } from "@repo/types";

// Helper function to safely access environment variables
const getEnv = (key: string): string | undefined => {
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && "env" in import.meta) {
    return (import.meta as Astro.ImportMeta)?.env?.[key];
  }
  return undefined;
};

export const IS_DEV = getEnv("NODE_ENV") !== "production";
export const IS_PROD = getEnv("NEXT_PUBLIC_VERCEL_ENV") === "production";
export const IS_SERVER = typeof globalThis?.window === "undefined";
export const IS_PREVIEW = getEnv("NEXT_PUBLIC_VERCEL_ENV") === "preview";
export const API_BASE = getEnv("NEXT_PUBLIC_API_BASE") || "";

export const SEPOLIA_PRIVATE_KEY = getEnv("SEPOLIA_PRIVATE_KEY") || "";
export const SEPOLIA_URL = getEnv("SEPOLIA_URL") || "";
// const MAINNET_PRIVATE_KEY = getEnv('MAINNET_PRIVATE_KEY') || "";
// const MAINNET_RPC_URL = getEnv('MAINNET_RPC_URL') || "";
