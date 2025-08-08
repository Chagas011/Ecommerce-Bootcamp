import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Header } from "@/components/header";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddressSection } from "./components/address-section";

export default async function IdentificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      items: true,
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Header />

      <div className="px-5 pt-24">
        <AddressSection />
      </div>
    </>
  );
}
