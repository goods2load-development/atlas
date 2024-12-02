import { cookiePolicyPageData } from './data';
import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LegacyPage from '@/components/Legacy/LegacyPage';

const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/cookie-policy`;

const title = 'Cookie Policy - GOODS2LOAD | Your Data, Our Responsibility';
const description =
  'Understand how GOODS2LOAD uses cookies to enhance your experience. Learn about our policies, cookie usage, and your options to manage preferences.';

export function generateMetadata(): Metadata {
  const defaultMetadata = generateDefaultMetadata();

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
}

const LegacyPageLazy = dynamic(() => import('@/components/Legacy/LegacyPage'), {
  ssr: false,
});

export default function CookiePolicyPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <LegacyPageLazy {...cookiePolicyPageData} />
      <Footer />
    </>
  );
}
