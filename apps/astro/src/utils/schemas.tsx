import { z } from "@repo/ui/components/form";

export const BuyMeACoffeeSchema = z.object({
  name: z.string().min(1),
  message: z.string().email(),
  amount: z.number().min(0.001),
});

export type BuyMeACoffeeInput = z.infer<typeof BuyMeACoffeeSchema>;
