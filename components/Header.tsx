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
          <NavigationMenuList>
            <NavigationMenuItem className="mx-[20px]">
              <Link href="/help">Help</Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-[20px]">
              <Link href="/help">Log in</Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent hover:bg-transparent active:bg-transparent">
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent active:bg-transparent bg-opacity-0 border-0">
                Sign up
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-[10px]">
                <Link href="/provider-registration">I provide services</Link>
                <Link href="/user-registration">I order a services</Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>{/* <Localization /> */}</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      {props.children}
    </div>
  );
}
