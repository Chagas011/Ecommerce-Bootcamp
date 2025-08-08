"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, ShoppingCartIcon } from "lucide-react";

import { getCart } from "@/actions/get-cart";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCentsToBRL } from "@/lib/utils";

import { CartItem } from "./cart-item";
import { Button } from "./ui/button";
export function Cart() {
  const { data: cart, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2">
              <ShoppingBag />
              <h2 className="text-xl">Sacola</h2>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-5">
          {isPending && <div>Carregando...</div>}
          {cart?.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.productVariant.product.name}
              productVariantImageUrl={item.productVariant.imageUrl}
              productVariantName={item.productVariant.name}
              productVariantPrice={item.productVariant.priceInCents}
              quantity={item.quantity}
            />
          ))}
        </div>

        <SheetFooter>
          <div className="flex justify-between">
            <h4 className="font-semibold">Subtotal</h4>
            <p>{cart && formatCentsToBRL(cart.totalPriceInCents)}</p>
          </div>
          <div className="flex justify-between">
            <h4 className="font-semibold">Entrega</h4>
            <p className="font-bold">GRATIS</p>
          </div>
          <div className="mt-5 flex w-full flex-col justify-center space-y-3 px-5">
            <Button variant={"default"} className="w-full py-7">
              Finalizar a compra
            </Button>
            <Button variant={"ghost"} className="w-full py-7">
              Continuar comprando
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
