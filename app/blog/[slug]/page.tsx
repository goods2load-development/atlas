import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Metadata } from 'next';
import Head from 'next/head';

import BlogSlug from '@/components/BlogSlug/BlogSlug';
import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

async function getBlogData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs/slug/${slug}`,
    {
      cache: 'no-store',
    },
  );
  return response.json();
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogData(slug);
  const defaultMetadata = generateDefaultMetadata();

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: blog.authorName }],
    keywords: blog.blogTypeName?.split(', '),
    openGraph: {
      ...defaultMetadata.openGraph,
      title: blog.title,
      description: blog.description,
      ...(!!blog.mainImageUrl && {
        images: [
          {
            ...defaultMetadata.openGraph.images[0],
            url: `${process.env.NEXT_PUBLIC_BASE_URL}${blog.mainImageUrl}`,
            alt: blog.title,
          },
        ],
      }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blog = await getBlogData(slug);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}${blog.mainImageUrl}`}
        />
      </Head>
      <HeaderClient variant="secondary" />
      <DynamicMenu />
      <BlogSlug blog={blog} />
      <Footer />
    </>
  );
}
