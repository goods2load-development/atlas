import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import MainLayout from '@/components/MainLayout';
import SeoPageMain from '@/components/SeoPage/SeoPageMain';

async function getSeoData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/seo-pages/${slug}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getSeoData(slug);

  if (!data) {
    return { title: 'Not Found' };
  }

  const defaultMetadata = generateDefaultMetadata();

  return {
    title: data?.title,
    description: data?.description || 'Goods2load',
    keywords: data?.category?.name || '',
    openGraph: {
      ...defaultMetadata.openGraph,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${data?.block1File}`,
          alt: data?.title,
        },
      ],
      title: data?.title,
      description: data?.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: data?.title,
      description: data?.description,
    },
  };
}

export default async function SeoPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getSeoData(slug);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <MainLayout>
        <HeaderClient variant="transparent" />
        <DynamicMenu variant="transparent" />
        <div className="px-4 max-w-[1328px] mx-auto">
          <h1 className="mt-8 sm:mt-16 mb-5 text-[38px]/[42px] sm:text-[64px]/[68px] font-light max-w-[1265px] text-center sm:text-left">
            {data?.title}
          </h1>
          <p className="font-light max-w-[916px] text-lg text-center block sm:text-left">
            {data?.description}
          </p>
        </div>
      </MainLayout>
      <SeoPageMain type="view" data={data} />
      <Footer />
    </>
  );
}
