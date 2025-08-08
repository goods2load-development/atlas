import { headers } from 'next/headers';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import Sitemap from '@/components/Sitemap/Sitemap';

export async function generateMetadata() {
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || 'https://goods2load.com';
  const fullUrl = `${baseUrl}/sitemap`;

  return {
    title: 'Sitemap | Goods2Load',
    description: 'Explore the complete sitemap of the Goods2Load platform.',
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: 'Sitemap | Goods2Load',
      description: 'Explore the complete sitemap of the Goods2Load platform.',
      url: fullUrl,
    },
    twitter: {
      title: 'Sitemap | Goods2Load',
      description: 'Explore the complete sitemap of the Goods2Load platform.',
    },
  };
}

export default async function SitemapPage() {
  const headersList = headers();

  const host = headersList.get('host');
  const proto = headersList.get('x-forwarded-proto');
  const protocol = proto
    ? proto
    : process.env.NODE_ENV === 'production'
      ? 'https'
      : 'http';

  const response = await fetch(`${protocol}://${host}/sitemap.json`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Sitemap data={data} />
      <Footer />
    </>
  );
}
