import z from "zod";

export const decreseCartProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreseCartProductQuantitySchema = z.infer<
  typeof decreseCartProductQuantitySchema
>;
