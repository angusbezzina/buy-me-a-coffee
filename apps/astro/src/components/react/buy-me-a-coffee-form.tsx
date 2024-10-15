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
import { Web3Provider, useWeb3 } from "@repo/web3client";

function BuyMeACoffeeFormImpl() {
  const form = useForm<BuyMeACoffeeInput>({
    resolver: zodResolver(BuyMeACoffeeSchema),
    defaultValues: {
      name: "",
      message: "",
      amount: 1,
    },
  });
  const { control, handleSubmit } = form;
  const { isWalletConnected, connectWallet, buyCoffee } = useWeb3();
  console.log("isWalletConnected");

  const onSubmit = handleSubmit((data) => {
    const { name, message, amount } = data;
    console.log("Form submitted with data:", data);
    buyCoffee(name, message, amount.toString());
  });

  if (!isWalletConnected) {
    return <Button onClick={connectWallet}>Connect Wallet</Button>;
  }

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
                <Input {...field} />
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
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <Input type="number" {...field} onChange={handleAmountChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Buy Me A Coffee</Button>
      </form>
    </Form>
  );
}

function BuyMeACoffeeForm() {
  return (
    <Web3Provider>
      <BuyMeACoffeeFormImpl />
    </Web3Provider>
  );
}

export { BuyMeACoffeeForm };
