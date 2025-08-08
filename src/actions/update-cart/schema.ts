import z from "zod";

export const updateCartAddress = z.object({
  addressId: z.uuid(),
});

export type UpdateCartAddress = z.infer<typeof updateCartAddress>;
