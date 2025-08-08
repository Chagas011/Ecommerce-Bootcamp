import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { Addresses } from "./addresses";

export async function AddressSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return [];

  const addresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
    orderBy: desc(shippingAddressTable.createdAt),
  });

  return (
    <div>
      <Addresses addresses={addresses} />
    </div>
  );
}
