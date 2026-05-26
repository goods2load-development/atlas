'use client';

import { useState } from 'react';

import Image from 'next/image';

// ── Link data ─────────────────────────────────────────────────────────────────

const RESOURCES = [
  { label: 'CO2 Emissions', href: 'https://goods2load.com/co2-emission' },
  {
    label: 'Custom Clearance',
    href: 'https://goods2load.com/custom-clearance',
  },
];

const LOGISTICS_SECTORS = [
  {
    label: 'Retail and E-commerce Logistics',
    href: 'https://goods2load.com/retail-and-e-commerce-logistics-solutions',
  },
  {
    label: 'Manufacturing Logistics',
    href: 'https://goods2load.com/manufacturing-logistics-solutions',
  },
  {
    label: 'Automotive Freight',
    href: 'https://goods2load.com/automotive-freight',
  },
  {
    label: 'Pharmaceutical Logistics Services',
    href: 'https://goods2load.com/pharmaceutical-logistics-services',
  },
  {
    label: 'Electronics Logistics',
    href: 'https://goods2load.com/electronics-logistics',
  },
  {
    label: 'Apparel Logistics',
    href: 'https://goods2load.com/apparel-logistics-solutions',
  },
  {
    label: 'Food and Beverage Logistics',
    href: 'https://goods2load.com/food-and-beverage-logistics',
  },
  {
    label: 'Construction Logistics',
    href: 'https://goods2load.com/construction-logistics-services',
  },
  {
    label: 'Energy Logistics',
    href: 'https://goods2load.com/best-energy-logistics-solutions',
  },
  {
    label: 'Aerospace Logistics',
    href: 'https://goods2load.com/aerospace-logistics-solutions-provider',
  },
];

const CARGO_SERVICES = [
  {
    label: 'Freight Forwarding Services',
    href: 'https://goods2load.com/international-freight-forwarder-services-in-dubai-uae',
  },
  {
    label: 'Air Freight Services',
    href: 'https://goods2load.com/best-air-cargo-air-freight-forwarders-in-dubai-uae',
  },
  {
    label: 'Sea Freight Services',
    href: 'https://goods2load.com/sea-freight-services',
  },
  {
    label: 'Land Freight Services',
    href: 'https://goods2load.com/best-land-freight-and-logistics-services-in-dubai-uae',
  },
];

const QUICK_LINKS = [
  { label: 'Company', href: 'https://goods2load.com/about-us?company' },
  { label: 'Trust', href: 'https://goods2load.com/about-us?trust' },
  { label: 'Media', href: 'https://goods2load.com/media' },
  {
    label: 'Become a partner',
    href: 'https://goods2load.com/partners-with-us',
  },
  { label: 'Our partners', href: 'https://goods2load.com/partners' },
  { label: 'Partner with Us', href: 'https://goods2load.com/partners-with-us' },
  {
    label: 'Affiliate program',
    href: 'https://goods2load.com/affiliate-program',
  },
  {
    label: 'Digital Community',
    href: 'https://goods2load.com/digital-community',
  },
  { label: 'Career', href: 'https://goods2load.com/career' },
  { label: 'Sign up Form', href: 'https://goods2load.com/registration' },
  { label: 'Contact Us', href: 'https://goods2load.com/contact-us' },
  { label: 'Blog', href: 'https://goods2load.com/blog' },
];

const LEGAL = [
  {
    label: 'Terms and Conditions',
    href: 'https://goods2load.com/terms-of-service',
  },
  { label: 'Cookie Policy', href: 'https://goods2load.com/cookie-policy' },
  { label: 'Privacy Policy', href: 'https://goods2load.com/privacy-policy' },
];

// ── Small helpers ─────────────────────────────────────────────────────────────

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-sm text-white/80 hover:text-white transition-colors leading-relaxed"
    >
      {children}
    </a>
  );
}

function Col({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
        {heading}
      </h3>
      <div className="space-y-2">
        {links.map((l) => (
          <ExternalLink key={l.label} href={l.href}>
            {l.label}
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}

// ── Social icon buttons ───────────────────────────────────────────────────────

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/40 text-white hover:bg-white/15 transition-colors"
    >
      {children}
    </a>
  );
}

function IgIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LiIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AgentFooter() {
  const [email, setEmail] = useState('');

  return (
    <footer className="w-full bg-primaryOrange text-white">
      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_0.8fr_1.6fr_1.6fr_1.6fr] gap-10">
          {/* ── Brand + contacts ─────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <Image
                src="/g2l-logo-circle.png"
                alt="Goods2Load"
                width={38}
                height={38}
                className="rounded-full bg-white p-0.5"
              />
              <span className="text-base font-extrabold tracking-widest uppercase text-white">
                GOODS2LOAD
              </span>
            </div>

            <p className="text-sm text-white/80 leading-relaxed">
              GOODS2LOAD is the premier platform for reliable, cost-effective
              logistics solutions and predictive data. Our mission is to
              transform the logistics landscape by integrating leading SMEs and
              digitizing traditional freight forwarders, delivering tailored
              services that meet the needs of emerging businesses worldwide.
            </p>

            {/* Contacts */}
            <div className="pt-1 space-y-2.5">
              <p className="text-xs font-bold text-white uppercase tracking-widest">
                Contacts
              </p>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span aria-hidden="true">🏢</span>
                <span>GOODS2LOAD FZ LLC</span>
              </div>
              <a
                href="tel:+971505574291"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <span aria-hidden="true">📞</span>
                <span>+971505574291</span>
              </a>
              <a
                href="mailto:hey@goods2load.com"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <span aria-hidden="true">✉️</span>
                <span>hey@goods2load.com</span>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              <SocialBtn
                href="https://www.instagram.com/goods2load"
                label="Instagram"
              >
                <IgIcon />
              </SocialBtn>
              <SocialBtn
                href="https://www.linkedin.com/company/goods2load"
                label="LinkedIn"
              >
                <LiIcon />
              </SocialBtn>
              <SocialBtn
                href="https://www.facebook.com/goods2load"
                label="Facebook"
              >
                <FbIcon />
              </SocialBtn>
            </div>
          </div>

          {/* ── Resources ────────────────────────────────────────────────── */}
          <Col heading="Resources" links={RESOURCES} />

          {/* ── Logistics Sectors ────────────────────────────────────────── */}
          <Col heading="Logistics Sectors" links={LOGISTICS_SECTORS} />

          {/* ── Logistics and cargo services ─────────────────────────────── */}
          <Col heading="Logistics and cargo services" links={CARGO_SERVICES} />

          {/* ── Quick Links + Newsletter ──────────────────────────────────── */}
          <div className="flex flex-col justify-between gap-8">
            <Col heading="Quick Links" links={QUICK_LINKS} />

            {/* Newsletter */}
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-3">
                Join our News Letter
              </p>
              <div className="flex rounded-md overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-white text-black text-sm px-3 py-2 outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setEmail('')}
                  aria-label="Subscribe"
                  className="bg-white border-l border-gray-200 px-3 py-2 text-primaryOrange hover:bg-orange-50 transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/70">
            GOODS2LOAD 2026 | All Rights Reserved
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {LEGAL.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
