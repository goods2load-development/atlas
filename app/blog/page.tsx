import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import BigLayout from '@/components/BigLayout';
import Footer from '@/components/Footer';

const title = 'Blog - GOODS2LOAD | Insights and Updates on Logistics';
const description =
  'Explore the GOODS2LOAD blog for the latest insights, trends, and updates on logistics, technology, and business solutions. Stay informed on how we’re transforming the logistics industry with innovative and sustainable practices.';

const BlogLazy = dynamic(() => import('@/components/Blog/Blog'), {
  ssr: false,
});

export function generateMetadata(): Metadata {
  const defaultMetadata = generateDefaultMetadata();

  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || 'https://goods2load.com';

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${baseUrl}/blog`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
  };
}

export default async function BlogPage() {
  const [categories, blogData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/blog-types`, {
      cache: 'no-store',
    }).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs?take=5&category=all&filter=Newest`,
      {
        cache: 'no-store',
      },
    ).then((res) => res.json()),
  ]);

  return (
    <>
      <BigLayout title="Blog">
        <BlogLazy categories={categories} blogData={blogData} />
      </BigLayout>
      <Footer />
    </>
  );
}
