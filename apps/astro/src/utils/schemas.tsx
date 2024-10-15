import { z } from "@repo/ui/components/form";

export const BuyMeACoffeeSchema = z.object({
  name: z.string().min(1),
  message: z.string().min(3),
  amount: z.number().min(0.001),
});

export type BuyMeACoffeeInput = z.infer<typeof BuyMeACoffeeSchema>;
