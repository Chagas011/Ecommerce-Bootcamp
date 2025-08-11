"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { FinishOrder } from "@/actions/finish-order";
import { Button } from "@/components/ui/button";

export function FinishOrderButton() {
  const queryClient = useQueryClient();
  const { mutateAsync: finishOrderMutate, isPending } = useMutation({
    mutationKey: ["create-order"],
    mutationFn: () => FinishOrder(),

    onSuccess: () => {
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
    </>
  );
}
