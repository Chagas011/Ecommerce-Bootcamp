"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { AddressSchema, addressSchema } from "../schema";

export function Addresses() {
  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: "",
      complement: "",
      cpf: "",
      email: "",
      name: "",
      neighborhood: "",
      number: "",
      phone: "",
      state: "",
      street: "",
      zipCode: "",
    },
  });
  function onSubmit(data: AddressSchema) {
    console.log(data);
  }
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificaçao</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar Novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new" && (
          <>
            <h3 className="mt-3 font-semibold">Adicionar Novo</h3>
            <div className="mt-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@email.com"
                            {...field}
                            type="email"
                            className="py-6"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome Completo"
                            {...field}
                            type="text"
                            className="py-6"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <PatternFormat
                              customInput={Input}
                              format="###.###.###-##"
                              allowEmptyFormatting
                              placeholder="000.000.000-00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Celular</FormLabel>
                          <FormControl>
                            <PatternFormat
                              customInput={Input}
                              format="(##) #####-####"
                              allowEmptyFormatting
                              placeholder="(11) 99999-9999"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu CEP"
                            {...field}
                            type="text"
                            className="py-6"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu endereço"
                            {...field}
                            type="text"
                            className="py-6"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Numero</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="20A"
                              {...field}
                              type="text"
                              className="py-6"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Casa"
                              {...field}
                              type="text"
                              className="py-6"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Pq America"
                              {...field}
                              type="text"
                              className="py-6"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="São Paulo"
                              {...field}
                              type="text"
                              className="py-6"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Estado"
                              {...field}
                              type="text"
                              className="py-6"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="mt-3 w-full py-6">
                    Continuar com o pagamento
                  </Button>
                </form>
              </Form>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
