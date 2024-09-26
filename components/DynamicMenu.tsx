import React, { useState, useEffect } from "react";
import { getRequest } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface IMenuItem {
  title: string;
  href: string;
  children?: IMenuItem[];
}

const DynamicMenu = () => {
  const [menuData, setMenuData] = useState<null | IMenuItem[]>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  useEffect(() => {
    getRequest({
      url: "dynamic-menu/header",
    }).then(({ json }) => {
      setMenuData(json);
    });
  }, []);

  if (!menuData) {
    return <div className="h-14"></div>;
  }

  return (
    <nav className="py-2 bg-[rgba(255,255,255,0.2)] text-white hidden sm:block w-full">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-10">
        {menuData.map(({ title, href, children }) => {
          return (
            <div
              key={title}
              className="relative"
              onMouseEnter={() => children && setOpenDropdown(title)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={href}
                className="py-2 px-3 hover:opacity-80 transition-opacity flex items-center gap-2 rounded hover:no-underline"
              >
                <span className="pointer-events-none">{title}</span>
                {children && (
                  <ChevronRight
                    className={clsx("w-4 h-4 transition-transform rotate-90", {
                      "-rotate-90": title === openDropdown,
                    })}
                  />
                )}
              </Link>

              {openDropdown === title && (
                <div
                  inert={title === openDropdown}
                  className={clsx(
                    `min-w-[200px] absolute bg-white text-black w-max animate-in transition-opacity animate-opacity
                    rounded-xl py-2 px-4 shadow-md`
                  )}
                >
                  {children?.map(({ title, href, children }) => {
                    return (
                      <div
                        key={title}
                        className="relative"
                        onMouseEnter={() => setOpenSubDropdown(title)}
                        onMouseLeave={() => setOpenSubDropdown(null)}
                      >
                        <Link
                          href={href}
                          className={clsx(
                            `py-2 text-sm hover:opacity-75 transition-opacity flex gap-2 items-center border-b hover:border-orangePrimary hover:text-orangePrimary border-orangeSecondary hover:no-underline`
                          )}
                        >
                          {title}
                          {!!children?.length && (
                            <ChevronRight className="w-4 h-4 text-orangePrimary" />
                          )}
                        </Link>

                        {openSubDropdown === title && !!children?.length && (
                          <div
                            inert={openSubDropdown === title}
                            className={clsx(
                              `absolute left-full top-0 bg-white w-max text-black animate-opacity
                              rounded-xl py-2 px-4 shadow-md`
                            )}
                          >
                            {children?.map(({ title, href }) => {
                              return (
                                <Link
                                  key={title}
                                  href={href}
                                  className={clsx(
                                    `py-2 text-sm hover:opacity-75 transition-opacity flex gap-2 items-center border-b hover:border-orangePrimary hover:text-orangePrimary border-orangeSecondary hover:no-underline`
                                  )}
                                >
                                  {title}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default DynamicMenu;
