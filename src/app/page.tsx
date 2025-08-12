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
      <div className="hidden justify-center pt-[120px] lg:flex">
        <CategorySelector categorys={categorys} />
      </div>

      <div className="space-y-6 px-5 pt-[120px] lg:pt-8">
        <div className="relative h-[720px] w-full rounded-3xl lg:hidden">
          <Image
            src="/banner01.png"
            alt=""
            fill
            className="h-auto w-full rounded-3xl object-contain"
          />
        </div>

        <div className="hidden justify-center lg:flex">
          <Image
            src="/banner01desktop.png"
            alt="bannerdesktop"
            width="1352"
            height="800"
          />
        </div>
        {/*IMPLEMENTAR MARCAS PARCEIRAS*/}
        <ProductCard products={products} title="Mais vendidos" />
        <div className="text-center lg:hidden">
          <CategorySelector categorys={categorys} />
        </div>

        <div className="relative h-[720px] w-full rounded-3xl lg:hidden">
          <Image
            src="/banner02.png"
            alt=""
            fill
            className="h-auto w-full rounded-3xl object-contain"
          />
        </div>

        <div className="lg:hidden">
          <ProductCard products={newlyCreatedProducts} title="Novidades" />
        </div>

        <div className="hidden max-w-full lg:grid lg:grid-cols-2 lg:gap-4">
          {/* Coluna da esquerda */}
          <div className="flex flex-col gap-4">
            <Image
              src="/banner01FDesktop.png"
              alt=""
              width={513}
              height={307}
              className="h-auto w-full"
            />
            <Image
              src="/banner02FDesktop.png"
              alt=""
              width={513}
              height={307}
              className="h-auto w-full"
            />
          </div>

          {/* Coluna da direita (imagem alta) */}
          <div className="h-full">
            <Image
              src="/banner03FDesktop.png"
              alt=""
              width={600}
              height={638}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
