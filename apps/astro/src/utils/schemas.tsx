import { z } from "@repo/ui/components/form";

export const BuyMeACoffeeSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
  message: z.string().min(2, "Please enter a valid message"),
  amount: z.number().min(0.0001, "Please enter an amount greater than 0.0001"),
});

export type BuyMeACoffeeInput = z.infer<typeof BuyMeACoffeeSchema>;
