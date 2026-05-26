'use client';

import ArrowSliderLeft from '@/assets/icons/arrow-slider-left.svg';
import { useUserStore } from '@/lib/store';
import { cn, isUserAdmin, isUserEditor, isUserProvider } from '@/lib/utils';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Logo from '@/components/Logo';
import Socials from '@/components/Socials';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, getUser } = useUserStore((state: any) => state);

  const isAdmin = isUserAdmin(user?.role);
  const isProvider = isUserProvider(user?.role);
  const isEditor = isUserEditor(user?.role);
  const [sideBar, setSidebar] = useState([
    {
      title: 'Performance',
      href: '/dashboard/performance',
      active: true,
    },
    {
      title: 'Market trends',
      href: '/dashboard/market-trends',
      active: false,
    },
    {
      title: 'Atlas Command',
      href: '/dashboard/atlas',
      active: false,
    },
  ]);

  useEffect(() => {
    if (!!!user?.id) getUser();
  }, [user?.id]);

  useEffect(() => {
    const slug = pathname.split('/').pop();
    setSidebar(
      sideBar.map((it) => {
        if (it.href.split('/').pop() === slug) {
          return { ...it, active: true };
        }
        return { ...it, active: false };
      }),
    );
  }, [pathname]);

  return (
    <aside className="hidden sm:flex justify-between flex-col bg-primary min-h-screen text-white p-6 min-w-[240px]">
      <div>
        <div className="flex flex-col">
          <button
            onClick={() => router.push('/account')}
            className="p-4 pl-0 self-start"
          >
            <Image width={15} height={15} src={ArrowSliderLeft} alt="back" />
          </button>
          {isProvider && (
            <>
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
                        }),
                      );
                    }}
                    id={it.title}
                    key={it.href}
                    href={it.href}
                    className={cn(
                      'font-light ml-3 mt-[16px] hover:no-underline relative',
                    )}
                  >
                    {it.title}
                    <div
                      className={cn(
                        'absolute -left-3 border top-0 hidden',
                        it.active && 'h-[110%] flex hover:flex',
                      )}
                    ></div>
                  </Link>
                ))}
              </div>

              <Link
                href="/dashboard/opportunities"
                className="font-semibold mb-8 hover:no-underline"
              >
                OPPORTUNITY
              </Link>
            </>
          )}
          {isAdmin && (
            <>
              <Link
                href="/dashboard/referral"
                className="font-semibold mb-8 hover:no-underline uppercase mt-6"
              >
                Referral
              </Link>
              <Link
                href="/dashboard/routes-list"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Routes
              </Link>
              <Link
                href="/dashboard/partners"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Partners
              </Link>
              <Link
                href="/dashboard/blog"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Blog
              </Link>
              <Link
                href="/dashboard/footer"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Footer
              </Link>
              <Link
                href="/dashboard/header"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Header
              </Link>
              <Link
                href="/dashboard/template"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Templates
              </Link>
            </>
          )}
          {isEditor && (
            <>
              <Link
                href="/dashboard/blog"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Blog
              </Link>
              <Link
                href="/dashboard/footer"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Footer
              </Link>
              <Link
                href="/dashboard/header"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Header
              </Link>
              <Link
                href="/dashboard/template"
                className="font-semibold mb-8 hover:no-underline uppercase"
              >
                Templates
              </Link>
            </>
          )}
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
