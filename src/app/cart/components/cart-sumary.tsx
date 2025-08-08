import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCentsToBRL } from "@/lib/utils";

interface ICartSumaryProp {
  subtotalInCents: number;
  totalInCents: number;
  products: {
    id: string;
    productName: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }[];
}

export function CartSumary({
  subtotalInCents,
  totalInCents,
  products,
}: ICartSumaryProp) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Seu pedido</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <p className="text-accent-foreground text-sm font-semibold">
              SubTotal
            </p>

            <p className="text-muted-foreground text-sm font-medium">
              {formatCentsToBRL(subtotalInCents)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-accent-foreground text-sm font-semibold">
              Frete
            </p>

            <p className="text-muted-foreground text-sm font-medium">Gratis</p>
          </div>
          <div className="flex justify-between">
            <p className="text-accent-foreground text-sm font-semibold">
              Taxa Estimada
            </p>

            <p className="text-muted-foreground text-sm">--</p>
          </div>
          <div className="flex justify-between">
            <p className="text-accent-foreground text-sm font-semibold">
              Total
            </p>

            <p className="font-bold">{formatCentsToBRL(totalInCents)}</p>
          </div>

          <div className="mt-5">
            {products.map((product) => (
              <div
                className="flex items-center gap-4 space-y-3"
                key={product.id}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.variantName}
                  width={100}
                  height={100}
                  className="rounded-md"
                />

                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="font-semibold">{product.productName}</h2>
                  <p>{product.variantName}</p>
                </div>
                <div className="flex flex-col items-end justify-center gap-2">
                  <p className="text-sm font-bold">
                    {formatCentsToBRL(product.priceInCents)}
                  </p>
                  <p className="text-accent-foreground text-sm">
                    Quantidade: {product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
