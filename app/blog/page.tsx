import { Metadata } from 'next';

import BigLayout from '@/components/BigLayout';
import Blog from '@/components/Blog/Blog';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog',
};

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
        <Blog categories={categories} blogData={blogData} />
      </BigLayout>
      <Footer />
    </>
  );
}
