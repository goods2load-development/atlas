"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useUserStore } from "@/lib/store";

export default function UserHeader({ children }: PropsWithChildren) {
  const { user, getUser } = useUserStore((state: any) => state);
  useEffect(() => {
    if (!!!user?.id) getUser();
  }, [user?.id]);
  return (
    <NavigationMenuList className="space-y-3 sm:space-y-0 sm:space-x-5 flex-col sm:flex-row sm:justify-end justify-center">
      <NavigationMenuItem>
        <Link href="/help" target="_blank">
          Help
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        {user?.firstName} {user?.lastName}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {user?.firstName?.slice(0, 1)}
            {user?.lastName?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
