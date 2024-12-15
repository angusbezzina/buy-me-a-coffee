import { CoffeeScene } from "@/components/react/animated-scenes/Coffee";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type LoggedOutPageProps = {
  title: string;
};

function LoggedOutPage({ title = "Connect to start!" }: LoggedOutPageProps) {
  return (
    <div>
      <div className="w-full md:max-w-3xl mx-auto min-h-screen flex flex-col gap-10 justify-center items-center px-4">
        <div className="flex flex-col items-center justify-center gap-10 -mt-[20dvh]">
          <CoffeeScene className="w-full h-full" />
          <h1>{title}</h1>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export { LoggedOutPage };
