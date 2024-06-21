"use client";

import Logo from "@/components/Logo";
import Socials from "@/components/Socials";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [sideBar, setSidebar] = useState([
    {
      title: "Performance",
      href: "/dashboard/performance",
      active: true,
    },
    {
      title: "Market trends",
      href: "/dashboard/market-trends",
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

  return (
    <aside className="hidden sm:flex justify-between flex-col bg-primary min-h-screen text-white p-6 min-w-[240px]">
      <div>
        <div>
          <Image
            alt="logo-performance"
            width={201}
            height={113}
            src={"/logo-performance.svg"}
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold mt-8">COMPANY’S INSIGHT</p>
          <div className="flex flex-col mb-8 performance-sidebar-item">
            {sideBar.map((it) => (
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
                className={cn(
                  "font-light ml-3 mt-[16px] hover:no-underline relative"
                )}
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
          </div>

          <Link
            href={"/dashboard/opportunities"}
            className="font-semibold mb-8 hover:no-underline"
          >
            OPPORTUNITY
          </Link>
          <button className="flex  font-light pl-[12px]">
            <LogOut className="mr-[8px]" />
            Logout Account
          </button>
        </div>
      </div>
      <div>
        <Logo width={175.35} height={24.7} />
        <Socials container="py-0 mt-[16px]" />
      </div>
    </aside>
  );
};

export default Sidebar;
