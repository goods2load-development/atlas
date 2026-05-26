'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// ── Navigation data ───────────────────────────────────────────────────────────
const MAIN_NAV = [
  { label: 'FAQs', href: '/help', external: false },
  { label: 'Log in', href: '/sign-in', external: false },
  { label: 'Sign up', href: '/registration', external: false },
];

const SUB_NAV = [
  {
    label: 'Are you a shipper?',
    href: 'https://goods2load.com/are-you-a-shipper',
  },
  {
    label: 'Are you a freight forwarder?',
    href: 'https://goods2load.com/why-freight-forwarders-choose-goods2load',
  },
  {
    label: 'Logistic Solutions',
    href: 'https://goods2load.com/best-freight-forwarding-services-in-dubai',
  },
  {
    label: 'Sectors',
    href: 'https://goods2load.com/retail-and-e-commerce-logistics-solutions',
  },
  {
    label: 'Corporate Training',
    href: 'https://goods2load.com/goods2load-corporate-courses',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AgentNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-primaryOrange text-white">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/g2l-logo-circle.png"
            alt="Goods2Load"
            width={36}
            height={36}
            priority
            className="rounded-full bg-white p-0.5"
          />
          <span className="text-sm font-bold tracking-widest uppercase text-white">
            Goods2Load
          </span>
        </Link>

        {/* Desktop right-side nav */}
        <nav className="hidden md:flex items-center gap-3">
          {/* Get a Demo — green pill */}
          <Link
            href="/registration"
            className="rounded-full bg-[#22C55E] hover:bg-[#16a34a] transition-colors px-5 py-1.5 text-xs font-semibold text-white"
          >
            Get a Demo
          </Link>

          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Currency */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors">
            USD – $
            <ChevronDown />
          </button>

          {/* Language */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors">
            🇬🇧 EN
            <ChevronDown />
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* ── Sub-nav ───────────────────────────────────────────────────────── */}
      <div className="hidden md:block border-t border-white/20 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-center gap-2 h-11">
          {SUB_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-md transition-colors whitespace-nowrap"
            >
              {item.label}
              <ChevronRight />
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/20 bg-primaryOrange px-5 py-4 space-y-1">
          <Link
            href="/registration"
            className="block w-full text-center rounded-full bg-[#22C55E] px-4 py-2.5 text-sm font-semibold text-white mb-4"
            onClick={() => setMobileOpen(false)}
          >
            Get a Demo
          </Link>

          <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest px-3 pb-1">
            Menu
          </p>
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest px-3 pt-3 pb-1">
            Explore
          </p>
          {SUB_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1 px-3 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              {item.label}
              <ChevronRight />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ── Micro icons ───────────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
