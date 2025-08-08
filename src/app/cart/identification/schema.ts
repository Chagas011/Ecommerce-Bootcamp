import z from "zod";

export const addressSchema = z.object({
  email: z.email(),
  name: z.string().min(1, "Este campo é obrigatório"),
  cpf: z
    .string()
    .min(14, "CPF incompleto") // "999.999.999-99" = 14 caracteres
    .refine((value) => {
      const cpf = value.replace(/\D/g, "");
      return cpf.length === 11;
    }, "CPF inválido"),
  phone: z
    .string()
    .min(15, "Celular incompleto") // (99) 99999-9999 = 15 caracteres
    .refine((value) => value.replace(/\D/g, "").length === 11, {
      message: "Celular inválido",
    }),
  zipCode: z.string().min(8, "CEP incorreto"),
  street: z.string().min(3, "Este campo é obrigatório"),
  number: z.string().min(1, "Este campo é obrigatório"),
  complement: z.string(),
  neighborhood: z.string().min(1, "Este campo é obrigatório"),
  city: z.string().min(1, "Este campo é obrigatório"),
  state: z.string().min(1, "Este campo é obrigatório"),
});

export type AddressSchema = z.infer<typeof addressSchema>;
