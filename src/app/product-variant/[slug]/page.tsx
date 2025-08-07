import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/lib/utils";

import { QuantitySelector } from "./components/quantity-selector";
import { VariantSelector } from "./components/variant-selector";

interface IProductVariantProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: IProductVariantProps) {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <div>
      <Header />
      <div className="flex flex-col space-y-6 px-5 pt-30">
        <div className="relative h-[500px] w-full rounded-3xl">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            fill
            className="h-auto w-full rounded-3xl object-cover"
          />
        </div>
        <div className="px-5">
          <VariantSelector variants={productVariant.product.variants} />
        </div>

        <div className="px-5">
          {/* Descricao */}
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex w-full flex-col justify-center space-y-3 px-5">
          <Button variant={"outline"} className="w-full py-7 font-semibold">
            Adicionar a sacola
          </Button>
          <Button variant={"default"} className="w-full py-7">
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-sm">{productVariant.product.description}</p>
        </div>

        <div>
          <ProductCard products={products} title="Talvez voce goste" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
