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
import { BuyMeACoffee__factory } from "@repo/web3/typechain-types";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

const abi = BuyMeACoffee__factory.abi;

function BuyMeACoffeeForm() {
  const { writeContract } = useWriteContract();

  const form = useForm<BuyMeACoffeeInput>({
    resolver: zodResolver(BuyMeACoffeeSchema),
    defaultValues: {
      name: "",
      message: "",
      amount: 0.001,
    },
  });
  const { control, handleSubmit } = form;

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
      <form onSubmit={onSubmit} className="flex flex-col w-full gap-8">
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
        <Button type="submit">Send it!</Button>
      </form>
    </Form>
  );
}

type BuyMeACoffeePageProps = {
  title: string;
};

function BuyMeACoffeePage({ title = "Buy me a coffee" }: BuyMeACoffeePageProps) {
  return (
    <Page>
      <div className="h-full min-h-[50vh] w-full flex flex-col gap-4 items-center justify-start">
        <h1>{title}</h1>
        <BuyMeACoffeeForm />
      </div>
    </Page>
  );
}

export { BuyMeACoffeePage };