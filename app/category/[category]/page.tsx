import { slugify } from '@/lib/utils';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import BigLayout from '@/components/BigLayout';
import BlogCategories from '@/components/BlogCategories/BlogCategories';
import Footer from '@/components/Footer';

export const metadata: Metadata = {};

const BlogCategoriesLazy = dynamic(
  () => import('@/components/BlogCategories/BlogCategories'),
  {
    ssr: false,
  },
);

export default async function CategoryBlogPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const blogData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs?category=${slugify(category, false)}&filter=Newest&take=4`,
    {
      cache: 'no-store',
    },
  ).then((res) => res.json());

  if (!blogData?.data || blogData.data.length === 0) {
    notFound();
  }

  const categoryName = blogData.data[0].blogTypeName;
  metadata.title = `${categoryName} | Category`;

  return (
    <>
      <BigLayout title={`Category: ${categoryName}`}>
        <BlogCategoriesLazy
          blogData={blogData}
          category={slugify(category, false)}
        />
      </BigLayout>
      <Footer />
    </>
  );
}
