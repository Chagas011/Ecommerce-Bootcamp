import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form ";

export default function Authentication() {
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
                <Button variant="outline" size="sm">
                  G Google
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="sign-up">
              <SignUpForm />
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Ou crie uma conta com
                </span>
                <Button variant="outline" size="sm">
                  G Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
