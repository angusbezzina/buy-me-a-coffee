import { Loading } from "@/components/react/loading";
import { Page } from "@/components/react/page";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { type BuyMeACoffeeInput, BuyMeACoffeeSchema } from "@/utils/schemas";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { BuyMeACoffee__factory } from "@repo/web3";
import { parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const abi = BuyMeACoffee__factory.abi;

function BuyMeACoffeeForm() {
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const form = useForm<BuyMeACoffeeInput>({
    resolver: zodResolver(BuyMeACoffeeSchema),
    defaultValues: {
      name: "",
      message: "",
      amount: 0.001,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    const { name, message, amount } = data;
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "buyCoffee",
        args: [name, message],
        value: parseEther(amount.toString()),
      });
    } catch (error) {
      console.error("Error buying coffee:", error);
    }
  });

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value) || 0;
    form.setValue("amount", value);
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="relative flex flex-col h-full w-full gap-8">
        {(isSubmitting || isLoading) && <Loading />}
        <div className="flex flex-col w-full gap-4">
          <FormField
            name="name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} placeholder="Jack Sparrow" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="message"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <Input {...field} placeholder="Love your work!" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (ETH)</FormLabel>
                <Input
                  type="number"
                  step="0.0001"
                  min="0.0001"
                  {...field}
                  onChange={handleAmountChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          Send it!
        </Button>
        {isSuccess && (
          <p className="font-bold text-lg text-center">Welcome to the club, champ 😎</p>
        )}
      </form>
    </Form>
  );
}

type BuyMeACoffeePageProps = {
  title: string;
};

function BuyMeACoffeePage({ title = "Show some support!" }: BuyMeACoffeePageProps) {
  return (
    <Page>
      <div className="w-full md:max-w-3xl min-h-[50vh] flex flex-col gap-4 justify-start items-center px-4">
        <h1>{title}</h1>
        <BuyMeACoffeeForm />
      </div>
    </Page>
  );
}

export { BuyMeACoffeePage };
