import { ConnectButton } from "@rainbow-me/rainbowkit";

type LoggedOutPageProps = {
  title: string;
};

function LoggedOutPage({ title = "Welcome!" }: LoggedOutPageProps) {
  return (
    <div>
      <div className="w-full md:max-w-3xl min-h-[50vh] flex flex-col gap-4 justify-start items-center px-4">
        <h1>{title}</h1>
        <ConnectButton />
      </div>
    </div>
  );
}

export { LoggedOutPage };
