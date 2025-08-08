import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Metadata } from 'next';
import Head from 'next/head';

import BlogSlug from '@/components/BlogSlug/BlogSlug';
import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

type ImageType = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

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

  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || 'https://goods2load.com';
  const canonical = `${baseUrl}/blog/${slug}`;

  // Get the default image from metadata or create a fallback
  const defaultImage: ImageType = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/thumbnail.png`,
    alt: blog.title,
  };

  // Get the first image from default metadata if it exists
  const defaultOgImage = Array.isArray(defaultMetadata.openGraph?.images)
    ? (defaultMetadata.openGraph.images[0] as ImageType)
    : defaultImage;

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: blog.authorName }],
    keywords: blog.blogTypeName?.split(', '),
    alternates: {
      canonical,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: blog.title,
      description: blog.description,
      url: canonical,
      images: blog.mainImageUrl
        ? [
            {
              ...defaultOgImage,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}${blog.mainImageUrl}`,
              alt: blog.title,
            },
          ]
        : [defaultOgImage],
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
