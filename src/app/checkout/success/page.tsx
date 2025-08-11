"use client";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChekoutSuccessPage() {
  return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="ilustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">
            Pedido Efetuado com sucesso !
          </DialogTitle>
          <DialogDescription>
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>
          <DialogFooter>
            <div className="flex w-full flex-col space-y-2">
              <Button className="py-6">
                <Link href="/my-orders/">Ver meus pedido</Link>
              </Button>
              <Button className="py-6" variant={"ghost"} asChild>
                <Link href="/">Pagina Inicial</Link>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
