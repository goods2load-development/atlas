import { headers } from 'next/headers';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import Sitemap from '@/components/Sitemap/Sitemap';

export default async function SitemapPage() {
  const headersList = headers();

  const host = headersList.get('host');
  const proto = headersList.get('x-forwarded-proto');
  const protocol = proto
    ? proto
    : process.env.NODE_ENV === 'production'
      ? 'https'
      : 'http';

  const response = await fetch(`${protocol}://${host}/sitemap.json`);
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
