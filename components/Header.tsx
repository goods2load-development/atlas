"use client";
import React, { PropsWithChildren, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
// localization routing not finished
// import Localization from "@/components/Localization";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "@/lib/store";
import LangSwitcher from "./LangSwicher";

export default function Header({ children }: PropsWithChildren) {
  const { user, getUser } = useUserStore((state: any) => state);
  useEffect(() => {
    if (!!!user?.id) getUser();
  }, [user?.id]);
  return (
    <div
      className={`${
        !!children ? "bg-bgMainPrimary pb-48" : "bg-orangePrimary"
      } bg-cover bg-center px-16 text-white`}
    >
      <header className="flex justify-between min-h-[75px]">
        <Logo width={236} height={28} />
        <NavigationMenu>
          <NavigationMenuList className="space-x-5">
            <NavigationMenuItem>
              <Link href="/help">Help</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sign-in">Log in</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/registration">Sign up</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <LangSwitcher />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      {children}
    </div>
  );
}
