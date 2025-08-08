import z from "zod";

export const removeCartProduct = z.object({
  cartItemId: z.uuid(),
});
