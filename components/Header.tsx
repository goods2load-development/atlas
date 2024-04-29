"use client";
import * as React from "react";
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

export default function Header(props: any) {
  return (
    <div
      className={`${
        !!props.children ? "bg-primaryOrange pb-48" : "bg-primaryOrange"
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
