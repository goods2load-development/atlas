import { cookiePolicyPageData } from './data';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LegacyPage from '@/components/Legacy/LegacyPage';

const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/cookie-policy`;

export const metadata: Metadata = {
  title: 'Cookie Policy - GOODS2LOAD | Your Data, Our Responsibility',
  description:
    'Understand how GOODS2LOAD uses cookies to enhance your experience. Learn about our policies, cookie usage, and your options to manage preferences.',
  openGraph: {
    title: 'Cookie Policy - GOODS2LOAD',
    description:
      'Find out how GOODS2LOAD utilizes cookies to optimize your browsing experience. Explore our cookie policies and your control options.',
    url: canonical,
  },
  twitter: {
    title: 'Cookie Policy - GOODS2LOAD',
    description:
      'Learn about GOODS2LOAD’s approach to cookie usage and your rights to customize your experience.',
  },
  alternates: {
    canonical,
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <LegacyPage {...cookiePolicyPageData} />
      <Footer />
    </>
  );
}
