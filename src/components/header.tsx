"use client";
import { HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
export function Header() {
  const { data: session } = authClient.useSession();
  return (
    <header className="bg-accent fixed top-0 left-0 z-50 flex h-[80px] w-full rounded-b-md p-4 text-white">
      <div className="">
        <Link href="/" className="text-2xl font-bold">
          Ecommerce Wabber Bootcamp
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-2">
            <SheetHeader>
              <SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="mb-4 px-10"
                >
                  <Link href="/">
                    <HomeIcon />
                    Home
                  </Link>
                </Button>
              </SheetTitle>
            </SheetHeader>
            {session?.user ? (
              <Card className="">
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string}
                          alt={session.user.name}
                        />
                        <AvatarFallback>
                          {session.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span>{session?.user?.email}</span>
                      </div>
                    </div>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                        className="px-5"
                      >
                        <LogOutIcon />
                      </Button>
                    </SheetTrigger>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="">
                  <CardHeader>
                    <CardTitle>Ola, faca seu login</CardTitle>
                    <CardDescription>Faca login para continuar</CardDescription>
                  </CardHeader>

                  <div className="flex justify-end">
                    <SheetTrigger asChild>
                      <Button size={"icon"} asChild variant={"outline"}>
                        <Link href="/authentication">
                          <LogInIcon />
                        </Link>
                      </Button>
                    </SheetTrigger>
                  </div>
                </CardContent>
              </Card>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
