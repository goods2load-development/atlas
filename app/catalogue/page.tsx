import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Metadata } from 'next';

import Catalogue from '@/components/Catalogue/Catalogue';
import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

const title = 'Catalogue - GOODS2LOAD | Discover Our Full Range of Products';
const description =
  'Explore the full catalogue of GOODS2LOAD products and services designed to meet all your logistics needs with efficiency and reliability.';

export function generateMetadata(): Metadata {
  const defaultMetadata = generateDefaultMetadata();

  return {
    title,
    description,
    alternates: {
      canonical: '/catalogue',
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: '/catalogue',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
}

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
