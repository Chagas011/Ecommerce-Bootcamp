import { categoryTable } from "@/db/schema";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ICategorySelectorProps {
  categorys: (typeof categoryTable.$inferSelect)[];
}

export function CategorySelector({ categorys }: ICategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {categorys.map((category) => (
        <Card key={category.id} className="p-0">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="h-full w-full rounded-2xl px-4 py-5 font-semibold"
            >
              {category.name}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
