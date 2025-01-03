import { CoffeeScene } from "@/components/react/animated-scenes/Coffee";
import { ConnectButton } from "@/components/react/connect-button";

type LoggedOutPageProps = {
  title: string;
};

function LoggedOutPage({ title = "Connect to start!" }: LoggedOutPageProps) {
  return (
    <div>
      <div className="text-center w-full md:max-w-3xl mx-auto min-h-screen flex flex-col gap-10 justify-center items-center px-4">
        <div className="flex flex-col items-center justify-center gap-10 -mt-[20dvh]">
          <CoffeeScene />
          <h1>{title}</h1>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export { LoggedOutPage };
