import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ICategorySelectorProps {
  categorys: (typeof categoryTable.$inferSelect)[];
}

export function CategorySelector({ categorys }: ICategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-around lg:space-x-2 xl:space-x-8">
      {categorys.map((category) => (
        <Card key={category.id} className="p-0">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="h-full w-full rounded-2xl px-4 py-5 font-semibold lg:w-[150px]"
              asChild
            >
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
