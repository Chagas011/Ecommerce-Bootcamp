"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

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
        <div>
          {isPending && <div>Carregando...</div>}
          {cart?.items.map((item) => (
            <div key={item.id}>
              <Image
                src={item.productVariant.imageUrl}
                alt={item.productVariant.product.name}
                width={100}
                height={100}
              />
              <div>
                <h3>{item.productVariant.product.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter>
          <div className="flex justify-between">
            <h4 className="font-semibold">Subtotal</h4>
            <p>
              {cart &&
                formatCentsToBRL(
                  cart?.items.reduce(
                    (acc, item) => acc + item.productVariant.priceInCents,
                    0,
                  ),
                )}
            </p>
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
