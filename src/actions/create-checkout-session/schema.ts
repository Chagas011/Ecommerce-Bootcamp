import z from "zod";

export const checkoutSessionSchema = z.object({
  orderId: z.uuid(),
});

export type CheckoutSessionSchema = z.infer<typeof checkoutSessionSchema>;
