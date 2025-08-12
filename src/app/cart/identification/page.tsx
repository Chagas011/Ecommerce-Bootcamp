import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CartSumary } from "../components/cart-sumary";
import { AddressSection } from "./components/address-section";

export default async function IdentificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/");
  }
  const cartTotalPrice = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <>
      <Header />
      <div className="hidden pt-24 lg:flex lg:justify-center">
        <Image src="/progress.png" width="649" height="10" alt="progress" />
      </div>

      <div className="space-y-4 px-5 pt-24 lg:grid lg:grid-cols-2 lg:gap-4 lg:pt-8">
        <div>
          <AddressSection />
        </div>
        <div>
          <CartSumary
            subtotalInCents={cartTotalPrice}
            totalInCents={cartTotalPrice}
            products={cart.items.map((item) => ({
              id: item.id,
              productName: item.productVariant.product.name,
              variantName: item.productVariant.name,
              quantity: item.quantity,
              priceInCents: item.productVariant.priceInCents,
              imageUrl: item.productVariant.imageUrl,
            }))}
          />
        </div>
      </div>
      <div className="mt-12 lg:mt-[248px]">
        <Footer />
      </div>
    </>
  );
}
