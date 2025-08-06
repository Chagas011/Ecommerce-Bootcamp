"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { productVariantTable } from "@/db/schema";

interface IVariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
}

export function VariantSelector({ variants }: IVariantSelectorProps) {
  const { slug } = useParams();
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            slug === variant.slug
              ? "border-primary rounded-xl border-4 border-solid"
              : ""
          }
        >
          <Image
            width={100}
            height={100}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-lg"
          />
        </Link>
      ))}
    </div>
  );
}
