"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { UpdateCartAddress, updateCartAddress } from "./schema";

export async function updateAddressCart(data: UpdateCartAddress) {
  updateCartAddress.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (shippingAddress, { eq, and }) =>
      and(
        eq(shippingAddress.id, data.addressId),
        eq(shippingAddress.userId, session.user.id),
      ),
  });

  if (!shippingAddress) {
    throw new Error("Address not found");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });
  if (!cart) {
    throw new Error("Cart not found");
  }

  await db
    .update(cartTable)
    .set({
      shippingAddressId: data.addressId,
    })
    .where(eq(cartTable.id, cart.id));

  return { success: true };
}
