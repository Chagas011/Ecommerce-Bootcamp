import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/lib/utils";

interface ICategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: ICategoryPageProps) {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });
  return (
    <div>
      <Header />

      <div className="pt-[120px]">
        <h2 className="text-2xl font-semibold">Categoria: {category.name}</h2>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 space-y-4 px-4 md:grid-cols-2 lg:grid-cols-3">
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
            <Card className="min-w-[220px] p-0" key={product.id}>
              <CardContent className="flex items-center justify-center py-2">
                {hasValidImage ? (
                  <Image
                    src={imageUrl}
                    width={400}
                    height={400}
                    alt="..."
                    className="rounded-2xl"
                  />
                ) : (
                  <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl bg-gray-200 text-xs text-gray-500">
                    Sem imagem
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <div className="flex max-w-[400px] flex-col gap-1">
                  <p className="truncate text-xl font-medium">{product.name}</p>
                  <p className="text-muted-foreground text-xs font-medium">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold">
                    {formatCentsToBRL(variant.priceInCents)}
                  </p>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
