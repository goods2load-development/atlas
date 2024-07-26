"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width: number;
  height: number;
}
export default function Logo(props: LogoProps) {
  return (
    <Link href="/" className="flex" target="_blank">
      <Image
        src="/logo.svg"
        alt="Goods2load Logo"
        className="dark:invert z-40"
        width={props.width}
        height={props.height}
        priority
      />
    </Link>
  );
}
