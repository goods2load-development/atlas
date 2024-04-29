"use client";
import React, { useEffect, useState } from "react";
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

export default function Header(props: any) {
  const { user, getUser } = useUserStore((state: any) => state);
  useEffect(() => {
    getUser();
  }, [user.id]);
  return (
    <div
      className={`${
        !!props.children ? "bg-bgMainPrimary pb-48" : "bg-orangePrimary"
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
            <NavigationMenuItem>{/* <Localization /> */}</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      {props.children}
    </div>
  );
}
