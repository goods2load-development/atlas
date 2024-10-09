"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "@/lib/store";
import LangSwitcher from "../LangSwicher";
import Currencies from "../Currencies";
import ErrorBoundary from "../ErrorBoundary";

import DynamicMenu from "./DynamicMenu";
import { IMenuItem } from "./types";

export type HeaderVariant = "primary" | "secondary";

interface HeaderProps extends PropsWithChildren {
  variant?: HeaderVariant;
  menuData: IMenuItem[];
}

export default function HeaderClient({
  children,
  variant = "primary",
  menuData,
}: HeaderProps) {
  const { user, getUser } = useUserStore((state: any) => state);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) getUser();
  }, [getUser, user?.id]);

  return (
    <div
      className={`${
        !!children
          ? "bg-orangePrimary bg-bgMainPrimaryMobile sm:bg-bgMainPrimary pb-48 h-[640px] sm:h-auto"
          : "bg-orangePrimary"
      } bg-cover bg-center text-white `}
    >
      <header
        className={`min-h-[75px] mx-auto ${open && "bg-orangePrimary"} bg-orangePrimary`}
      >
        <div className="flex items-center justify-between px-4 max-w-[1328px] mx-auto">
          <Logo width={236} height={28} />
          <div
            className="w-[32px] h-[24px] sm:hidden flex flex-col justify-between items-center relative"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <>
                <i className="bg-white w-full h-[2px] transform rotate-45 absolute top-1/2" />
                <i className="bg-white w-full h-[2px] transform -rotate-45 absolute top-1/2" />
              </>
            ) : (
              <>
                <i className="bg-white w-full h-[2px]" />
                <i className="bg-white w-[24px] h-[2px]" />
                <i className="bg-white w-full h-[2px]" />
              </>
            )}
          </div>
          <NavigationMenu
            className={`${!open && "hidden"} sm:block absolute sm:static top-16 left-0 w-full max-w-full sm:w-auto rounded-sm p-5 bg-orangePrimary sm:bg-transparent text-white pr-0`}
          >
            <NavigationMenuList className="space-y-3 sm:space-y-0 sm:space-x-5 flex-col sm:flex-row sm:justify-end justify-center">
              <NavigationMenuItem>
                <Link href="/help">FAQs</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Currencies />
              </NavigationMenuItem>
              {user?.id ? (
                <NavigationMenuItem>
                  <Link href="/account" className="flex items-center">
                    <img src="/userwhite.svg" alt={"user-white"} />
                  </Link>
                </NavigationMenuItem>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/sign-in">Log in</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/registration?user">Sign up</Link>
                  </NavigationMenuItem>
                </>
              )}
              <NavigationMenuItem>
                <ErrorBoundary>
                  <LangSwitcher />
                </ErrorBoundary>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <DynamicMenu menuData={menuData} variant={variant} />
        </div>
      </header>
      {children}
    </div>
  );
}
