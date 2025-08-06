"use client";

import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/lib/utils";

import { Button } from "./ui/button";
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
            <Card
              key={product.id}
              className="flex min-w-[220px] justify-center"
            >
              <CardContent className="flex justify-center px-2 py-2">
                {hasValidImage ? (
                  <Image
                    src={imageUrl}
                    width={200}
                    height={200}
                    alt="..."
                    className="rounded-3xl"
                  />
                ) : (
                  <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl bg-gray-200 text-xs text-gray-500">
                    Sem imagem
                  </div>
                )}
              </CardContent>

              <CardFooter className="px-2">
                <div className="flex max-w-[200px] flex-col gap-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-muted-foreground truncate text-xs font-medium">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      {formatCentsToBRL(variant.priceInCents)}
                    </p>

                    <Button asChild>
                      <Link href={`/product-variant/${variant.slug}`}>Ver</Link>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
