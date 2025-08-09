import z from "zod";

export const checkoutSessionSchema = z.object({
  cartId: z.uuid(),
  orderId: z.uuid(),
});

export type CheckoutSessionSchema = z.infer<typeof checkoutSessionSchema>;
