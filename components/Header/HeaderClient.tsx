'use client';

import Currencies from '../Currencies';
import ErrorBoundary from '../ErrorBoundary';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import NavLinkMobile from './NavLinkMobile';
import useBreakpoint from '@/app/hooks/useBreakpoint';
import UserWhite from '@/assets/icons/userwhite.svg';
import { useFooterHeaderStore, useUserStore } from '@/lib/store';

import { PropsWithChildren, useEffect, useState } from 'react';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useLockBodyScroll } from 'react-use';

import Logo from '@/components/Logo';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const LangSwitcher = dynamic(() => import('../LangSwicher'), {
  ssr: false,
});

export type HeaderVariant = 'primary' | 'secondary' | 'transparent';

interface HeaderProps extends PropsWithChildren {
  variant?: HeaderVariant;
  className?: string;
}

export default function HeaderClient({
  variant = 'primary',
  className = '',
}: HeaderProps) {
  const { user, getUser } = useUserStore((state: any) => state);
  const [open, setOpen] = useState(false);

  const { isBelowSm } = useBreakpoint('sm');

  const { headerData, getHeaderData } = useFooterHeaderStore();

  useEffect(() => {
    getHeaderData();
  }, [getHeaderData]);

  useEffect(() => {
    if (!user?.id) getUser();
  }, [getUser, user?.id]);

  useLockBodyScroll(open && isBelowSm);

  return (
    <header
      className={clsx(
        'flex items-center justify-between  sm:block mx-auto bg-orangePrimary py-6 sm:py-0 relative z-40',
        open ? 'bg-orangePrimary' : '',
        variant === 'transparent' && !open && 'bg-transparent',
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 max-w-[1328px] sm:mx-auto flex-1">
        <Logo width={236} height={28} />
        <div
          className="w-[32px] h-[24px] sm:hidden flex flex-col justify-between items-center relative"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <>
              <i className="bg-white w-full h-[2px] transform rotate-45 absolute top-1/2" />
              <i className="bg-white w-full h-[2px] transform -rotate-45 absolute top-1/2" />
            </>
          ) : (
            <>
              <i className="bg-white w-full h-[2px]" />
              <i className="bg-white w-[24px] h-[2px]" />
              <i className="bg-white w-full h-[2px]" />
            </>
          )}
        </div>
        <NavigationMenu
          className={`${open && isBelowSm ? '!fixed left-0 right-0 bottom-0 top-[77px] pb-4 overflow-y-scroll' : 'hidden'}  sm:block absolute z-20 sm:static top-16 left-0 w-full max-w-full sm:w-auto rounded-sm sm:p-5  bg-orangePrimary sm:bg-transparent text-white pr-0`}
        >
          <div className="flex flex-col w-full max-h-[calc(100vh-100px)]">
            <NavigationMenuList className="sm:hidden flex-col items-start px-10">
              <Accordion
                type="single"
                collapsible
                className="w-full self-center flex flex-col justify-center"
              >
                {headerData?.json?.map((item, index) => {
                  return item.href && !!!item?.children?.length ? (
                    <Link
                      key={item.href}
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="block w-max"
                      href={item.href}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="sm:py-4 border-none"
                    >
                      <AccordionTrigger className="text-white font-light hover:no-underline md:ml-4 ml-0">
                        <p className="text inline">{item.title}</p>
                      </AccordionTrigger>
                      <AccordionContent className="">
                        {item.children?.map((childItem) => (
                          <NavLinkMobile
                            item={childItem}
                            key={childItem.href}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </NavigationMenuList>
            <hr className="w-full border-t border-white my-4 opacity-30 sm:hidden" />
            <NavigationMenuList
              className="space-y-3 sm:space-y-0 sm:space-x-5 flex-col items-start
             max-sm:gap-5 sm:flex-row sm:justify-end max-sm:px-10"
            >
              <NavigationMenuItem>
                <Link
                  className="rounded-[48px] px-2 py-1 transition bg-[#b7f218] hover:bg-[#a9e503] text-[#2f2a58] no-underline"
                  target="_blank"
                  href="https://calendly.com/hey-goods2load/30min"
                >
                  Get a Demo
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/help">FAQs</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Currencies />
              </NavigationMenuItem>
              {user?.id ? (
                <NavigationMenuItem>
                  <Link href="/account" className="flex items-center">
                    <Image
                      width={26}
                      height={26}
                      src={UserWhite}
                      alt={'user-white'}
                    />
                  </Link>
                </NavigationMenuItem>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/sign-in">Log in</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/registration?user">Sign up</Link>
                  </NavigationMenuItem>
                </>
              )}
              <NavigationMenuItem>
                <ErrorBoundary>
                  <LangSwitcher />
                </ErrorBoundary>
              </NavigationMenuItem>
            </NavigationMenuList>
          </div>
        </NavigationMenu>
      </div>
    </header>
  );
}
