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
        <Image
          src="/banner01.png"
          alt="leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vm"
          className="h-auto w-full lg:h-[600px]"
        />
        {/*IMPLEMENTAR MARCAS PARCEIRAS*/}
        <ProductCard products={products} title="Mais vendidos" />
        <div className="text-center">
          <CategorySelector categorys={categorys} />
        </div>

        <Image
          src="/banner02.png"
          alt="leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vm"
          className="h-auto w-full lg:h-[600px]"
        />

        <ProductCard products={newlyCreatedProducts} title="Novidades" />
      </div>

      <Footer />
    </div>
  );
}
