"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddressSchema, addressSchema } from "./schema";

export const createShippingAddress = async (data: AddressSchema) => {
  addressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientname: data.name,
      street: data.address,
      number: data.number,
      complement: data.complement || null,
      address: data.address,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      zipCode: data.zipCode,
      country: "Brasil",
      phone: data.phone,
      email: data.email,
      cpfOrCnpj: data.cpf,
    })
    .returning();

  revalidatePath("/cart/identification");

  return shippingAddress;
};
