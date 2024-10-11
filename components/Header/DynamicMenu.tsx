"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { IMenuItem } from "./types";

const MenuItems = ({
  items,
  depth = 1,
}: {
  items: IMenuItem[];
  depth?: number;
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  return items.map(({ title, href, children }) => {
    const isDropdownOpen = openDropdown === title;

    return (
      <div
        key={title}
        className="relative"
        onMouseEnter={() => children && setOpenDropdown(title)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        {depth === 1 && (
          <>
            {!href ? (
              <p className="py-2 px-3 hover:opacity-80 transition-opacity flex items-center gap-2 rounded hover:no-underline">
                <span className="pointer-events-none">{title}</span>
                {!!children?.length && (
                  <ChevronRight
                    className={clsx("w-4 h-4 transition-transform rotate-90", {
                      "-rotate-90": title === openDropdown,
                    })}
                  />
                )}
              </p>
            ) : (
              <Link
                href={href}
                className="py-2 px-3 hover:opacity-80 transition-opacity flex items-center gap-2 rounded hover:no-underline"
              >
                {title}
                {!!children?.length && (
                  <ChevronRight
                    className={clsx("w-4 h-4 transition-transform rotate-90", {
                      "-rotate-90": title === openDropdown,
                    })}
                  />
                )}
              </Link>
            )}
          </>
        )}
        {!!(depth === 1 ? children : items)?.length && (
          <>
            {(isDropdownOpen || depth > 1) && (
              <div
                className={clsx(
                  `min-w-[200px] absolute z-10 bg-white text-black w-max animate-in transition-opacity animate-opacity
              rounded-xl py-2 px-4 shadow-md`
                )}
              >
                {(depth === 1 ? children : items)?.map(
                  ({ title, href, children }) => (
                    <div
                      key={title}
                      className="relative"
                      onMouseEnter={() => {
                        setOpenSubDropdown(title);
                      }}
                      onMouseLeave={() => setOpenSubDropdown(null)}
                    >
                      {children?.length ? (
                        <p
                          className={clsx(
                            `py-2 text-sm hover:opacity-75 transition-opacity flex gap-2 items-center border-b hover:border-orangePrimary hover:text-orangePrimary border-orangeSecondary hover:no-underline`
                          )}
                        >
                          {title}
                          <ChevronRight className="w-4 h-4 text-orangePrimary" />
                        </p>
                      ) : (
                        <Link
                          href={href}
                          className={clsx(
                            `py-2 text-sm hover:opacity-75 transition-opacity flex gap-2 items-center border-b hover:border-orangePrimary hover:text-orangePrimary border-orangeSecondary hover:no-underline`
                          )}
                        >
                          {title}
                        </Link>
                      )}

                      {openSubDropdown === title && !!children?.length && (
                        <div className="absolute right-0 top-0">
                          <MenuItems depth={depth + 1} items={children} />
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  });
};

const DynamicMenu = ({ variant = "primary", menuData }: any) => {
  if (!menuData) {
    return <div className="h-14"></div>;
  }

  return (
    <nav
      className={clsx(
        "py-2 text-white w-full relative z-19",
        variant === "primary"
          ? "bg-[rgba(255,255,255,0.2)]"
          : "bg-primaryOrange"
      )}
    >
      <div className="sm:container sm:mx-auto sm:px-4 sm:flex flex-wrap  items-center justify-center sm:gap-x-10 sm:gap-y-4 relative flex-1">
        {menuData && <MenuItems items={menuData} />}
      </div>
    </nav>
  );
};

export default DynamicMenu;
