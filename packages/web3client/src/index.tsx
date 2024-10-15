import { BuyMeACoffee__factory } from "@repo/web3/typechain-types";
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

  interface ImportMetaEnv {
    readonly PUBLIC_SEPOLIA_URL: string;
    readonly PUBLIC_SEPOLIA_CONTRACT_ADDRESS: string;
    readonly PUBLIC_MAINNET_CONTRACT_ADDRESS: string;
    readonly DEV: boolean;
    // more env variables...
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

interface Web3Context {
  isWalletConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  publicClient: PublicClient | null;
  buyCoffee: (name: string, message: string, amount: string) => Promise<void>;
  memos: any[];
}

const Web3Context = React.createContext<Web3Context | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const [account, setAccount] = React.useState<string | null>(null);
  const [publicClient, setPublicClient] = React.useState<PublicClient | null>(null);
  const [memos, setMemos] = React.useState<any[]>([]);

  React.useEffect(() => {
    setPublicClient(
      createPublicClient({
        chain: import.meta.env.DEV ? sepolia : mainnet,
        transport: http(import.meta.env.PUBLIC_SEPOLIA_URL),
      }),
    );
  }, []);

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
      setAccount(accounts.length > 0 && accounts[0]?.address ? accounts[0].address : null);
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

  const buyCoffee = React.useCallback(
    async (name: string, message: string, amount: string) => {
      if (!account || !publicClient || !window.ethereum) {
        console.error(
          "Wallet not connected, public client not initialized, or window.ethereum not available",
        );
        return;
      }

      try {
        if (!window.ethereum) throw new Error("No ethereum object");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = import.meta.env.PUBLIC_SEPOLIA_CONTRACT_ADDRESS;
        const buyMeACoffee = BuyMeACoffee__factory.connect(contractAddress, signer);

        const tx = await buyMeACoffee.buyCoffee(name, message, {
          value: ethers.parseEther(amount),
        });

        await tx.wait();
        console.log("Coffee bought successfully!");

        const newMemos = await buyMeACoffee.getMemos();
        setMemos(newMemos);
      } catch (error) {
        console.error("Error buying coffee:", error);
      }
    },
    [account, publicClient],
  );

  React.useEffect(() => {
    checkWalletConnection();
  }, [checkWalletConnection]);

  React.useEffect(() => {
    const fetchMemos = async () => {
      if (account && publicClient) {
        try {
          if (!window.ethereum) throw new Error("No ethereum object");
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contractAddress = import.meta.env.PUBLIC_SEPOLIA_CONTRACT_ADDRESS;
          console.log("Contract address:", contractAddress);

          // Check if the contract address is valid
          if (!ethers.isAddress(contractAddress)) {
            throw new Error("Invalid contract address");
          }

          const buyMeACoffee = BuyMeACoffee__factory.connect(contractAddress, provider);

          try {
            const fetchedMemos = await buyMeACoffee.getMemos();
            console.log("Fetched memos:", fetchedMemos);
            setMemos(fetchedMemos);
          } catch (memoError) {
            console.log("Error calling getMemos:", memoError);

            // Attempt to get the raw result
            const rawResult = await provider.call({
              to: contractAddress,
              data: buyMeACoffee.interface.encodeFunctionData("getMemos"),
            });
            console.log("Raw getMemos result:", rawResult);

            if (rawResult === "0x") {
              console.log("No memos found. Returning an empty array.");
              setMemos([]);
            } else {
              console.error("Unexpected result from getMemos");
            }
          }
        } catch (error) {
          console.error("Error in fetchMemos:", error);
        }
      }
    };

    fetchMemos();
  }, [account, publicClient]);

  const value = {
    isWalletConnected,
    account,
    connectWallet,
    publicClient,
    buyCoffee,
    memos,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = React.useContext(Web3Context);

  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
