import React, { PropsWithChildren, useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";

export type HeaderVariant = "primary" | "secondary";

interface HeaderProps extends PropsWithChildren {
  variant?: HeaderVariant;
}

export default async function Header({
  children,
  variant = "primary",
}: HeaderProps) {
  const menuData = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/dynamic-menu/header`, {
      cache: "no-store",
    })
  ).json();

  return (
    <HeaderClient variant={variant} menuData={menuData.json}>
      {children}
    </HeaderClient>
  );
}
