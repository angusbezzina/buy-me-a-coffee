import { Page } from "@/components/react/page";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { useGif } from "@/utils/hooks/useGif";
import { type BuyMeACoffee, BuyMeACoffee__factory } from "@repo/web3";
import { useReadContract } from "wagmi";

type PatronListPageProps = {
  title: string;
  description: string;
};

const abi = BuyMeACoffee__factory.abi;

function PatronCard({ memo, index = 0 }: { memo: BuyMeACoffee.MemoStructOutput; index: number }) {
  const formattedTimestamp = new Date(Number(memo.timestamp) * 1000).toLocaleString();
  const { gif } = useGif(index);

  return (
    <div
      key={`${memo.timestamp}-${memo.from}`}
      className="w-full flex gap-6 rounded-lg border shadow-sm p-4"
    >
      <div className="h-20 w-20 min-w-20 rounded-md bg-foreground/80 overflow-hidden">
        {gif && <img src={gif} alt="Memo Gif" className="w-full h-full object-cover" />}
      </div>
      <div className="flex flex-col justify-start items-start gap-2 text-left">
        <i className="text-sm">{formattedTimestamp}</i>
        <div className="flex flex-col gap-0">
          <h6 className="break-all">
            {memo.name} ({memo.from})
          </h6>
          <p>{memo.message}</p>
        </div>
      </div>
    </div>
  );
}

function PatronsList() {
  const result = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getMemos",
  });
  const memos = result.data?.map((memo) => memo as BuyMeACoffee.MemoStructOutput) || [];

  return (
    <>
      {memos.map((memo, index) => (
        <PatronCard key={`${memo.timestamp}-${memo.from}`} memo={memo} index={index} />
      ))}
    </>
  );
}

function PatronsListPage({ title, description }: PatronListPageProps) {
  return (
    <Page>
      <div className="w-full md:max-w-3xl h-full min-h-[50vh] flex flex-col gap-4 justify-start items-center text-center">
        <h1>{title}</h1>
        <h6>{description}</h6>
        <PatronsList />
      </div>
    </Page>
  );
}

export { PatronsListPage };
