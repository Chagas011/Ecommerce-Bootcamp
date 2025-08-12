import { eq } from "drizzle-orm";
import { AlignLeftIcon, ArrowLeftIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CartSumary } from "../components/cart-sumary";
import { FinishOrderButton } from "./components/finishOrderButton";
export default async function ConfirmationPage() {
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

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  return (
    <div className="space-y-3">
      <Header />
      <div className="hidden pt-24 lg:flex lg:justify-center">
        <Image src="/progress2.png" width="649" height="10" alt="progress" />
      </div>
      <div className="pt-30 lg:pt-8"></div>

      <div className="space-y-2 lg:grid lg:grid-cols-2">
        <div className="space-y-2 px-5">
          <Link href="/cart/identification" className="flex gap-1">
            <ArrowLeftIcon /> Voltar
          </Link>
          <Card>
            <CardHeader>
              <CardTitle>Endereço selecionado</CardTitle>
            </CardHeader>

            <CardContent>
              <Card>
                <CardContent>
                  <p className="text-sm font-semibold">
                    {cart.shippingAddress.recipientname}:{" "}
                    {cart.shippingAddress.address},{" "}
                    {cart.shippingAddress.number} - {cart.shippingAddress.city}/
                    {cart.shippingAddress.state} -{" "}
                    {cart.shippingAddress.neighborhood} - CEP:{" "}
                    {cart.shippingAddress.zipCode}
                  </p>
                </CardContent>
              </Card>

              <FinishOrderButton />
            </CardContent>
          </Card>
        </div>
        <div className="px-5">
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

      <div className="mt-36 lg:mt-[388px]">
        <Footer />
      </div>
    </div>
  );
}
