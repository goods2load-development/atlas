import { IMenuItem } from './types';

import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MenuItems = ({
  items,
  depth = 1,
}: {
  items: IMenuItem[];
  depth?: number;
}) => {
  return items?.map(({ title, href, children }) => (
    <div key={title} className="relative group">
      {depth === 1 && (
        <>
          {!href ? (
            <p className="py-2 px-3 hover:opacity-80 transition-opacity flex items-center gap-2 rounded hover:no-underline">
              <span className="pointer-events-none">{title}</span>
              {!!children?.length && (
                <ChevronRight className="w-4 h-4 transition-transform group-hover:-rotate-90" />
              )}
            </p>
          ) : (
            <Link
              href={href}
              className="py-2 px-3 hover:opacity-80 transition-opacity flex items-center gap-2 rounded hover:no-underline"
            >
              {title}
              {!!children?.length && (
                <ChevronRight className="w-4 h-4 transition-transform group-hover:-rotate-90" />
              )}
            </Link>
          )}
        </>
      )}

      {!!(depth === 1 ? children : items)?.length && (
        <div
          className={clsx(
            `min-w-[200px] absolute z-50 text-black w-max animate-in transition-opacity animate-opacity
            rounded-xl py-2 px-4 shadow-md hidden group-hover:block bg-white`,
          )}
        >
          {(depth === 1 ? children : items)?.map(
            ({ title, href, children }) => (
              <div
                key={title}
                className={clsx(
                  'relative',
                  depth === 0 ? 'group' : 'group/sub',
                )}
              >
                {children?.length ? (
                  <p className="py-2 text-sm hover:opacity-75 transition-opacity flex gap-2 items-center border-b hover:border-orangePrimary hover:text-orangePrimary border-orangeSecondary hover:no-underline">
                    {title}
                    <ChevronRight className="w-4 h-4 text-orangePrimary" />
                  </p>
                ) : (
                  <Link
                    href={href}
                    className="py-2 text-sm hover:opacity-75 transition-opacity flex gap-2 items-center border-b hover:border-orangePrimary hover:text-orangePrimary border-orangeSecondary hover:no-underline"
                  >
                    {title}
                  </Link>
                )}

                {!!children?.length && (
                  <div className="absolute left-0 md:left-[100%] top-[100%] md:top-0 hidden group-hover/sub:block">
                    <MenuItems depth={depth + 1} items={children} />
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  ));
};

interface IMenuData {
  id: string;
  json: IMenuItem[];
}

const DynamicMenu = async ({ variant = 'primary' }: any) => {
  const menuData: IMenuData = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/dynamic-menu/header`, {
      cache: 'no-store',
    })
  ).json();

  if (!menuData || !menuData?.json?.length) {
    return <div className="h-14"></div>;
  }

  return (
    <nav
      className={clsx(
        'sm:py-2 text-white w-full relative z-30',
        variant === 'primary' && 'bg-primaryOrange',
        variant === 'secondary' && 'bg-[#FFB393]',
        variant === 'transparent' && 'bg-[rgba(255,255,255,0.2)]',
      )}
    >
      <div className="sm:container sm:mx-auto sm:px-4 flex flex-wrap items-center justify-center sm:gap-x-10 sm:gap-y-4 relative flex-1">
        {menuData && <MenuItems items={menuData.json} />}
      </div>
    </nav>
  );
};

export default DynamicMenu;
