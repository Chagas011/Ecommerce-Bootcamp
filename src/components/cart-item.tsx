import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { removeProductCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/lib/utils";

import { Button } from "./ui/button";

interface ICartItemProps {
  id: string;
  productName: string;
  productVariantImageUrl: string;
  productVariantName: string;
  productVariantPrice: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantImageUrl,
  productVariantName,
  productVariantPrice,
  quantity,
}: ICartItemProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteItem } = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductCart({ cartItemId: id }),
    onSuccess: () => {
      toast.success("Produto removido do carrinho");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Error ao remover o produto");
    },
  });
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={100}
          height={100}
          className="rounded-md"
        />

        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">{productName}</h2>
          <p>{productVariantName}</p>

          <div className="flex w-[100px] items-center justify-between">
            <Button onClick={() => {}} className="h-8 w-8">
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button onClick={() => {}} className="h-8 w-8">
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <Button variant={"outline"} size={"icon"} onClick={() => deleteItem()}>
          <Trash2Icon className="text-red-600" />
        </Button>
        <p className="mt-5 font-bold">
          {formatCentsToBRL(productVariantPrice)}
        </p>
      </div>
    </div>
  );
}
