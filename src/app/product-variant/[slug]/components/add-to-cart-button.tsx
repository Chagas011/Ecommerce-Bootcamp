"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: async () => {
      const res = await addProductToCart({
        productVariantId,
        quantity,
      });

      if (res?.error) {
        throw new Error(res.message);
      }

      return res;
    },

    onSuccess: () => {
      toast.success("Produto adicionado ao carrinho");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          toast.error("Faça login para continuar a compra");
          router.push("/authentication");
        }
      }
    },
  });
  const handleBuyNow = async () => {
    try {
      await mutation.mutateAsync();
      router.push("/cart/identification"); // redireciona após adicionar
    } catch {}
  };
  return (
    <div className="space-y-2 lg:flex lg:gap-3">
      <Button
        variant={"outline"}
        className="w-full py-7 font-semibold lg:flex-1"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        {mutation.isPending && <Loader2 className="mr-1 animate-spin" />}
        Adicionar a sacola
      </Button>
      <Button
        variant={"default"}
        className="w-full py-7 lg:flex-1"
        onClick={handleBuyNow}
        disabled={mutation.isPending}
      >
        Comprar agora
      </Button>
    </div>
  );
}
