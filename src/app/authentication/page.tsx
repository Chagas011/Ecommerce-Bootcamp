"use client";

import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form ";

export default function Authentication() {
  const router = useRouter();
  const authClient = createAuthClient();
  const handleSignWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };
  return (
    <>
      <Header />
      <div className="mt-40 flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Tabs defaultValue="sign-in">
            <TabsList>
              <TabsTrigger value="sign-in">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <SignInForm />
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Ou entre com
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignWithGoogle}
                  type="button"
                >
                  G Google
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="sign-up">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
