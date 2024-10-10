"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";
import { getRequest } from "@/lib/utils";
import { IMenuItem } from "./types";

export type HeaderVariant = "primary" | "secondary";

interface HeaderProps extends PropsWithChildren {
  variant?: HeaderVariant;
}

interface IMenuData {
  id: string;
  json: IMenuItem[];
}

export default function Header({ children, variant = "primary" }: HeaderProps) {
  const [menuData, setMenuData] = useState<IMenuData | undefined>(undefined);

  useEffect(() => {
    getRequest({
      url: "/dynamic-menu/header",
    }).then((data: IMenuData) => setMenuData(data));
  }, []);

  // const menuData = await (
  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/dynamic-menu/header`, {
  //     cache: "no-store",
  //   })
  // ).json();

  return (
    <HeaderClient variant={variant} menuData={menuData?.json}>
      {children}
    </HeaderClient>
  );
}
