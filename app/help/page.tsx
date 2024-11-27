import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Suspense } from 'react';

import { Metadata } from 'next';

import BigLayout from '@/components/BigLayout';
import Footer from '@/components/Footer';
import Help from '@/components/Help/Help';

const data: Record<string, { title: string; description: string }> = {
  ship: {
    title: 'Help with Shipping - GOODS2LOAD | Expert Shipping Solutions',
    description:
      'Explore expert help and support for all your shipping needs with GOODS2LOAD. Learn how we optimize logistics to make shipping easier and more efficient for you.',
  },
  plane: {
    title: 'Help with Air Transport - GOODS2LOAD | Your Air Freight Experts',
    description:
      'Discover our air freight solutions and find the support you need to streamline your air transport operations with GOODS2LOAD.',
  },
  truck: {
    title: 'Help with Trucking - GOODS2LOAD | Reliable Trucking Solutions',
    description:
      'Find assistance for your trucking and road logistics challenges. GOODS2LOAD is here to make your trucking operations seamless and cost-effective.',
  },
  default: {
    title: 'Help - GOODS2LOAD | Expert Logistics Support',
    description:
      'Doing business has never been easier. Learn how GOODS2LOAD can assist you.',
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
  const key = Object.keys(searchParams)?.[0];
  const meta = data[key] || data.default;
  const defaultMetadata = generateDefaultMetadata();

  const canonical = key
    ? `${process.env.NEXT_PUBLIC_CLIENT_URL}/help?${key}`
    : `${process.env.NEXT_PUBLIC_CLIENT_URL}/help`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: meta.title,
      description: meta.description,
      url: canonical,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: meta.title,
      description: meta.description,
    },
  };
}

const HelpPage = () => {
  return (
    <>
      <BigLayout
        title="How we can help you?"
        description="Doing business has never been easier."
      >
        <Suspense>
          <Help />
        </Suspense>
      </BigLayout>
      <Footer />
    </>
  );
};

export default HelpPage;
