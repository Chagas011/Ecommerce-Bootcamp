"use client";

import Image from "next/image";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/lib/utils";

import { Card, CardContent, CardFooter } from "./ui/card";

interface IProductCardProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export function ProductCard({ products, title }: IProductCardProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold">{title}</h3>

      <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {products.map((product) => {
          const variant = product.variants[0];
          const rawImage = variant.imageUrl;

          console.log("rawImage:", rawImage);

          let imageUrl = rawImage;

          if (
            typeof rawImage === "string" &&
            rawImage.startsWith("{") &&
            rawImage.endsWith("}")
          ) {
            imageUrl = rawImage.slice(1, -1).replace(/^"|"$/g, "");
          }

          const hasValidImage =
            typeof imageUrl === "string" && imageUrl.startsWith("https");

          return (
            <Card key={product.id}>
              <CardContent>
                {hasValidImage ? (
                  <Image
                    src={encodeURI(imageUrl)}
                    alt={variant.name}
                    width={200}
                    height={200}
                    className="rounded-3xl"
                  />
                ) : (
                  <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl bg-gray-200 text-xs text-gray-500">
                    Sem imagem
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <div className="flex max-w-[200px] flex-col gap-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-muted-foreground truncate text-xs font-medium">
                    {product.description}
                  </p>
                  <p className="truncate text-xs font-bold">
                    {formatCentsToBRL(variant.priceInCents)}
                  </p>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
