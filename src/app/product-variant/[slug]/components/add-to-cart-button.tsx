"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface IAddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

export function AddToCartButton({
  productVariantId,
  quantity,
}: IAddToCartButtonProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),

    onSuccess: () => {
      toast.success("Produto adicionado ao carrinho");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <>
      <Button
        variant={"outline"}
        className="w-full py-7 font-semibold"
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-1 animate-spin" />}
        Adicionar a sacola
      </Button>
      <Button variant={"default"} className="w-full py-7">
        Comprar agora
      </Button>
    </>
  );
}
