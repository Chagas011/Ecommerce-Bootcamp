import Image from "next/image";

import { CategorySelector } from "@/components/categorySelector";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/productCard";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categorys = await db.query.categoryTable.findMany();

  return (
    <div>
      <Header />
      <div className="space-y-6 px-5">
        <Image
          src="/banner01.png"
          alt="leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vm"
          className="h-auto w-full"
        />
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
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
