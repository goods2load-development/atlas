"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";
import DynamicMenu from "./DynamicMenu";

export type HeaderVariant = "primary" | "secondary";

interface HeaderProps extends PropsWithChildren {
  variant?: HeaderVariant;
}

export default function Header({ variant = "primary" }: HeaderProps) {
  return (
    <HeaderClient variant={variant}>
      <DynamicMenu />
    </HeaderClient>
  );
}
