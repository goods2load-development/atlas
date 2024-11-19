import { Metadata } from 'next';

import Catalogue from '@/components/Catalogue/Catalogue';
import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/catalogue`;

export const metadata: Metadata = {
  title: 'Catalogue - GOODS2LOAD | Discover Our Full Range of Products',
  description:
    'Explore the full catalogue of GOODS2LOAD products and services designed to meet all your logistics needs with efficiency and reliability.',
  openGraph: {
    title: 'Catalogue - GOODS2LOAD',
    description:
      'Discover a wide range of products and services tailored for effective logistics.',
    url: canonical,
  },
  twitter: {
    title: 'Catalogue - GOODS2LOAD',
    description:
      'Explore GOODS2LOAD’s diverse catalogue for innovative logistics solutions.',
  },
  alternates: {
    canonical,
  },
};

export default function CataloguePage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Catalogue />
      <Footer />
    </>
  );
}
