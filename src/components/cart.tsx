import { ShoppingBag, ShoppingCartIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
export function Cart() {
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

        <SheetFooter>
          <div className="flex justify-between">
            <h4 className="font-semibold">Subtotal</h4>
            <p>R$ 234,99</p>
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
