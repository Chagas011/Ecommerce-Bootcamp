import { desc } from "drizzle-orm";
import Image from "next/image";

import { CategorySelector } from "@/components/categorySelector";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/productCard";
import { db } from "@/db";
import { productTable } from "@/db/schema";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categorys = await db.query.categoryTable.findMany();

  return (
    <div>
      <Header />
      <div className="space-y-6 px-5 pt-[120px]">
        <div className="relative h-[720px] w-full rounded-3xl">
          <Image
            src="/banner01.png"
            alt=""
            fill
            className="h-auto w-full rounded-3xl object-contain"
          />
        </div>
        {/*IMPLEMENTAR MARCAS PARCEIRAS*/}
        <ProductCard products={products} title="Mais vendidos" />
        <div className="text-center">
          <CategorySelector categorys={categorys} />
        </div>

        <div className="relative h-[720px] w-full rounded-3xl">
          <Image
            src="/banner02.png"
            alt=""
            fill
            className="h-auto w-full rounded-3xl object-contain"
          />
        </div>

        <ProductCard products={newlyCreatedProducts} title="Novidades" />
      </div>

      <Footer />
    </div>
  );
}
