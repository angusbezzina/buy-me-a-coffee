import { Header } from "@/components/react/header";
import { LoggedOutPage } from "@/components/react/pages/logged-out";
import { Providers } from "@/components/react/providers";
import { OWNER_ADDRESS } from "@/utils/constants";
import React from "react";
import { useAccount } from "wagmi";

type PageProps = {
  children: React.ReactNode | React.ReactNode[];
};

function PageImpl({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { isConnected, address } = useAccount();
  const isOwner = address === OWNER_ADDRESS;

  if (!isConnected) {
    return <LoggedOutPage title="Welcome!" />;
  }

  return (
    <>
      <Header isOwner={isOwner} />
      <div className="relative w-screen h-full min-h-screen mx-auto px-4 flex flex-col justify-center items-center gap-6">
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
