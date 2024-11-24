import { ACTIVE_CHAIN, IS_PROD, MAINNET_URL, PROJECT_ID, SEPOLIA_URL } from "@/utils/constants";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// Note: Every dApp that relies on WalletConnect now needs to obtain a projectId from [WalletConnect Cloud/Reown](https://cloud.walletconnect.com/).
// This is absolutely free and only takes a few minutes.
export const config = getDefaultConfig({
  appName: "Buy Me A Coffee",
  projectId: PROJECT_ID,
  chains: [ACTIVE_CHAIN],
  transports: {
    [mainnet.id]: http(MAINNET_URL),
    [sepolia.id]: http(SEPOLIA_URL),
  },
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
