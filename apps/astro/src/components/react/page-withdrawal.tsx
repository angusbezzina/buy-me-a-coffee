import { Page } from "@/components/react/page";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { Button } from "@repo/ui/components/button";
import { BuyMeACoffee__factory } from "@repo/web3/typechain-types";
import { useWriteContract } from "wagmi";

type WithdrawalPageProps = {
  title: string;
};

const abi = BuyMeACoffee__factory.abi;

function WithdrawButton() {
  const { writeContract } = useWriteContract();

  async function handleWithdraw() {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "withdrawTips",
    });
  }

  return <Button onClick={handleWithdraw}>🏦 Break it!!!</Button>;
}

function WithdrawalPage({ title = "Time to break the bank!" }: WithdrawalPageProps) {
  return (
    <Page>
      <div className="w-full md:max-w-3xl min-h-[50vh] flex flex-col gap-4 justify-start items-center px-4">
        <h1>{title}</h1>
        <WithdrawButton />
      </div>
    </Page>
  );
}

export { WithdrawalPage };
