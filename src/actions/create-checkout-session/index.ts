"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { cartItemTable, cartTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CheckoutSessionSchema, checkoutSessionSchema } from "./schema";

export async function createCheckoutSession(data: CheckoutSessionSchema) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("stripe secret key is not set");
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const { cartId, orderId } = checkoutSessionSchema.parse(data);

  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.id, cartId),
  });

  if (!cart) {
    throw new Error("Cart not found");
  }
  if (cart.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }
  const cartItems = await db.query.cartItemTable.findMany({
    where: eq(cartItemTable.cartId, cartId),
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: { orderId },
    line_items: cartItems.map((cartItem) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${cartItem.productVariant.product.name} - ${cartItem.productVariant.name}`,
            description: cartItem.productVariant.product.description,
            images: [cartItem.productVariant.imageUrl],
          },

          unit_amount: cartItem.productVariant.priceInCents,
        },

        quantity: cartItem.quantity,
      };
    }),
  });

  return checkoutSession;
}
