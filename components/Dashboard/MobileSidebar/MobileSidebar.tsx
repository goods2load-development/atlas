"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { cn, isUserProvider } from "@/lib/utils";
import closeSvg from "@/assets/close.svg";
import { LogOut } from "lucide-react";
import { useUserStore } from "@/lib/store";

const MobileSidebar: React.FC = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const { user } = useUserStore((state: any) => state);

  const isProvider = isUserProvider(user?.role);
  const [sideBar, setSidebar] = useState([
    {
      title: "Performance",
      href: "/dashboard/performance",
      active: false,
    },
    {
      title: "Market trends",
      href: "/dashboard/market-trends",
      active: false,
    },
    {
      title: "Opportunity",
      href: "/dashboard/opportunities",
      active: false,
    },
  ]);

  useEffect(() => {
    const slug = pathname.split("/").pop();
    setSidebar(
      sideBar.map((it) => {
        if (it.href.split("/").pop() === slug) {
          return { ...it, active: true };
        }
        return { ...it, active: false };
      })
    );
  }, [pathname]);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [expanded]);

  return (
    <aside
      className={cn(
        "sm:hidden fixed w-full bg-primaryOrange top-0 z-10 px-4 py-2 pb-4",
        expanded ? "h-[auto] overflow-scroll" : "h-[56px] overflow-hidden"
      )}
      style={{}}
    >
      <div className="flex items-center justify-between gap-2">
        <Button
          onClick={() => setExpanded((expanded) => !expanded)}
          className="p-0"
        >
          {!expanded ? (
            <Image alt="menu" width={32} height={32} src="/menu.svg" />
          ) : (
            <Image
              alt="close-menu"
              width={32}
              height={32}
              src={closeSvg}
              className="bg-white rounded-full"
            />
          )}
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
        {isProvider &&
          sideBar.map((it) => (
            <Link
              onClick={(e) => {
                setSidebar(
                  sideBar.map((el) => {
                    if (it.title === el.title) {
                      return { ...el, active: true };
                    }
                    return { ...el, active: false };
                  })
                );
              }}
              id={it.title}
              key={it.href}
              href={it.href}
              className="ml-3 hover:no-underline relative text-white"
            >
              {it.title}
              <div
                className={cn(
                  "absolute -left-3 border top-0 hidden",
                  it.active && "h-[110%] flex hover:flex"
                )}
              ></div>
            </Link>
          ))}

        <Button className="flex  font-light pl-[12px] text-white mt-8">
          <LogOut className="mr-[8px]" />
          Logout Account
        </Button>
      </div>
    </aside>
  );
};

export default MobileSidebar;
