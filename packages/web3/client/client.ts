import { IS_DEV, SEPOLIA_URL } from "@repo/constants";
import { ethers } from "ethers";
import React from "react";
import { PublicClient, createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

export function useWeb3() {
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const [account, setAccount] = React.useState<string | null>(null);
  const [publicClient, setPublicClient] = React.useState<PublicClient | null>(null);

  // NOTE: Initialize publicClient in useEffect to avoid issues with SSR
  React.useEffect(() => {
    setPublicClient(
      createPublicClient({
        chain: IS_DEV ? sepolia : mainnet,
        transport: http(SEPOLIA_URL),
      }),
    );
  }, [IS_DEV]);

  const checkWalletConnection = React.useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      console.log("MetaMask is not installed");
      setIsWalletConnected(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();

      setIsWalletConnected(accounts.length > 0);
      setAccount(accounts.length > 0 ? accounts[0].address : null);
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      setIsWalletConnected(false);
    }
  }, []);

  const connectWallet = React.useCallback(async () => {
    console.log("Connecting wallet");
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setIsWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }, []);

  React.useEffect(() => {
    checkWalletConnection();
  }, [checkWalletConnection]);

  return { isWalletConnected, account, connectWallet, publicClient };
}
