"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
          size={"icon"}
        >
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button onClick={() => setQuantity((prev) => prev + 1)} size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
