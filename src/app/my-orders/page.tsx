import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { formatCentsToBRL } from "@/lib/utils";
export default async function MyOrderPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/authentication");
  }
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <Header />

      <h1 className="px-5 pt-32 text-2xl font-bold">Meus Pedidos</h1>
      <div className="mt-8 space-y-5 px-5">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value={order.id}>
                  <AccordionTrigger>
                    <div className="flex flex-col space-y-1">
                      {order.status === "paid" && (
                        <Badge>Pagamento confirmado</Badge>
                      )}
                      {order.status === "pending" && (
                        <Badge variant={"secondary"}>Pagamento pendente</Badge>
                      )}
                      {order.status === "canceled" && (
                        <Badge variant={"destructive"}>
                          Pagamento Cancelado
                        </Badge>
                      )}
                      Numero do Pedido
                      <p className="text-accent-foreground text-sm">
                        #{order.id}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-5">
                      {order.items.map((item) => (
                        <div key={item.id}>
                          <div className="flex items-center gap-4 space-y-3">
                            <Image
                              src={item.productVariant.imageUrl}
                              alt={item.productVariant.name}
                              width={100}
                              height={100}
                              className="rounded-md"
                            />

                            <div className="flex flex-1 flex-col gap-1">
                              <h2 className="font-semibold">
                                {item.productVariant.product.name}
                              </h2>
                              <p className="text-muted-foreground text-sm">
                                {item.productVariant.product.description}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {item.productVariant.name}
                              </p>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm font-bold">
                                  {formatCentsToBRL(item.priceInCents)}
                                </p>
                                <p className="text-accent-foreground text-sm">
                                  Quantidade: {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between px-5 pt-10">
                            <p className="font-bold">Subtotal</p>
                            <p className="text-sm font-semibold">
                              {formatCentsToBRL(order.totalPriceInCents)}
                            </p>
                          </div>
                          <div className="flex justify-between px-5 pt-10">
                            <p className="font-bold">FRETE</p>
                            <p className="text-muted-foreground">Grátis</p>
                          </div>
                          <div className="flex justify-between px-5 pt-10">
                            <p className="font-bold">Taxa Estimada</p>
                            <p className="text-muted-foreground">---</p>
                          </div>

                          <div className="flex justify-between px-5 pt-10">
                            <p className="font-bold">Total</p>
                            <p className="text-sm font-semibold">
                              {formatCentsToBRL(order.totalPriceInCents)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
