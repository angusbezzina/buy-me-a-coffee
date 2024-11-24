import { Header } from "@/components/react/header";
import { Providers } from "@/components/react/providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";

type PageProps = {
  children: React.ReactNode | React.ReactNode[];
};

function PageImpl({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectButton />;
  }

  return (
    <>
      <Header />
      <div className="relative w-full h-full min-h-screen md:max-w-3xl mx-auto px-4 flex flex-col justify-center items-center gap-6">
        {children}
      </div>
    </>
  );
}

function Page({ children }: PageProps) {
  return (
    <Providers>
      <PageImpl>{children}</PageImpl>
    </Providers>
  );
}

export { Page };
