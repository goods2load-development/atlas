import { slugify } from '@/lib/utils';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import BigLayout from '@/components/BigLayout';
import Footer from '@/components/Footer';

const BlogCategoriesLazy = dynamic(
  () => import('@/components/BlogCategories/BlogCategories'),
  { ssr: false },
);

const slugifyCategory = (str: string, strict: boolean = true) => {
  let slug = str
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-') // Replace spaces and underscores with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars except -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end

  if (strict) {
    slug = slug.replace(/[^a-z0-9\-]/g, '');
  }

  return slug;
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || 'https://goods2load.com';

  const slug = slugify(params.category, false);
  const canonicalSlug = slugifyCategory(params.category, false);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs?category=${slug}&filter=Newest&take=1`,
    { cache: 'no-store' },
  );
  const blogData = await res.json();

  if (!blogData.data || blogData.data.length === 0) {
    return {
      title: 'Category not found',
    };
  }

  const categoryName = blogData.data[0].blogTypeName;
  const canonicalUrl = `${baseUrl}/category/${canonicalSlug}`;

  return {
    title: `${categoryName} | Category`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CategoryBlogPage({
  params: { category },
}: {
  params: { category: string };
}) {
  // ✅ Decode again to ensure it's clean
  const decodedCategory = decodeURIComponent(category);
  const slug = slugify(decodedCategory, false);

  const blogData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs?category=${slug}&filter=Newest&take=4`,
    { cache: 'no-store' },
  ).then((res) => res.json());

  if (!blogData?.data || blogData.data.length === 0) {
    notFound();
  }

  const categoryName = blogData.data[0].blogTypeName;

  return (
    <>
      <BigLayout title={`Category: ${categoryName}`}>
        <BlogCategoriesLazy blogData={blogData} category={slug} />
      </BigLayout>
      <Footer />
    </>
  );
}
