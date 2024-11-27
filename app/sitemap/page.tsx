import dynamic from 'next/dynamic';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import Header from '@/components/Header/Header';
import HeaderClient from '@/components/Header/HeaderClient';
import Sitemap from '@/components/Sitemap/Sitemap';

const SitemapLazy = dynamic(() => import('@/components/Sitemap/Sitemap'), {
  ssr: false,
});

export default function SitemapPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <SitemapLazy />
      <Footer />
    </>
  );
}
