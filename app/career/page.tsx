import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

const title = 'Join Our Team - GOODS2LOAD | Careers in Logistics Innovation';
const description =
  'Ready to challenge the logistics industry? Join the GOODS2LOAD team and make an impact with smart working opportunities in sales, customer care, and logistics partnerships. Apply';

const CareerFormLazy = dynamic(
  () => import('../_components/Career/CareerForm/CareerForm'),
  {
    ssr: false,
  },
);

const JoinOurTeamLazy = dynamic(
  () => import('../_components/Career/JoinOurTeam/JoinOurTeam'),
  {
    ssr: false,
  },
);

export function generateMetadata(): Metadata {
  const defaultMetadata = generateDefaultMetadata();
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || 'https://goods2load.com';

  const pathname = '/careers';
  const canonicalUrl = `${baseUrl}${pathname}`;

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: canonicalUrl,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const Career = () => {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] sm:py-[104px] px-5 m-auto">
        <JoinOurTeamLazy />
        <CareerFormLazy />
      </section>
      <Footer />
    </>
  );
};

export default Career;
