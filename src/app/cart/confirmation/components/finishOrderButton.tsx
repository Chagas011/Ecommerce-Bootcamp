"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { FinishOrder } from "@/actions/finish-order";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export function FinishOrderButton() {
  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: finishOrderMutate, isPending } = useMutation({
    mutationKey: ["create-order"],
    mutationFn: () => FinishOrder(),

    onSuccess: () => {
      setSuccessDialogIsOpen(true);
      toast.success("Pedido finalizado");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Erro ao finalizar o pedido");
    },
  });

  async function handleFinishOrderMutate() {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("stripe publishable kei is not set");
    }
    const { orderId } = await finishOrderMutate();
    const checkoutSession = await createCheckoutSession({ orderId });
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("failed to  load stripe");
    }

    await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
  }

  return (
    <>
      <Button
        className="mt-6 w-full py-6"
        onClick={() => handleFinishOrderMutate()}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Finalizar Compra"
        )}
      </Button>

      <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
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
              <Button className="py-6">Ver meus pedido</Button>
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
