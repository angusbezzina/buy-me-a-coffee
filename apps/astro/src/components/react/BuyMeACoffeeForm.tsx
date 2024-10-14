import { type BuyMeACoffeeInput, BuyMeACoffeeSchema } from "@/utils/schemas";
import { IS_DEV } from "@repo/constants";
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
import { useWeb3 } from "@repo/web3/client";

function BuyMeACoffeeForm() {
  const form = useForm<BuyMeACoffeeInput>({
    resolver: zodResolver(BuyMeACoffeeSchema),
  });
  const { control, handleSubmit } = form;
  const { isWalletConnected, connectWallet } = useWeb3();

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend or blockchain
  });

  if (!isWalletConnected) {
    return <Button onClick={connectWallet}>Connect Wallet</Button>;
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
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
              <Input type="number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Buy Me A Coffee</Button>
      </form>
    </Form>
  );
}

export { BuyMeACoffeeForm };
