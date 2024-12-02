import { Page } from "@/components/react/page";

type WithdrawalPageProps = {
  title: string;
};

function WithdrawalPage({ title = "Time to break the bank 🏦" }: WithdrawalPageProps) {
  return (
    <Page>
      <div className="w-full md:max-w-3xl min-h-[50vh] flex flex-col gap-4 justify-start items-center px-4">
        <h1>{title}</h1>
      </div>
    </Page>
  );
}

export { WithdrawalPage };
