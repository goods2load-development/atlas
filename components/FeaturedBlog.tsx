import decorLine from '@/assets/Blog/blog-decor-line.svg';

import React from 'react';

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedBlogProps {
  blog: Blog;
  categories: BlogType[];
}

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  blogTypeId: string;
  blogTypeName: string;
  authorId: string | null;
  authorName: string | null;
  weight: number;
  readingTime: number;
  mainImageUrl: string;
  publishDate: string | null;
}

interface BlogType {
  id: string;
  name: string;
}

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ blog }) => {
  const imageUrl = blog.mainImageUrl
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${blog.mainImageUrl}`
    : '/default-image.jpg';
  return (
    <div className="mb-8 w-full mt-10 overflow-visible relative text-left">
      <div className="flex flex-col md:flex-row gap-6 items-start rounded-lg container max-w-[1320px] px-4 relative z-20">
        <div className="relative w-full md:w-[620px] h-[388px]">
          <img
            src={imageUrl}
            alt={blog.title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="p-2 md:p-8 w-full md:w-1/2 flex flex-col justify-center md:pt-[53px]">
          <div className="flex items-center">
            <Link
              href={`/blog-category/${blog.blogTypeName}`}
              className="bg-orange-500 text-white text-sm font-semibold mb-2 px-2 py-1 rounded-lg"
            >
              {blog?.blogTypeName || 'all'}
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            <Link
              href={{
                pathname: `/blog/${blog.slug}`,
              }}
            >
              {blog.title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{blog.description}</p>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>{format(new Date(blog.updatedAt), 'dd MMM yyyy')}</span>
            <span>{blog.readingTime} min read</span>
          </div>
        </div>
      </div>
      <Image
        className="absolute xl:w-[53%] w-[50%] md:block hidden -top-[20%] right-0 z-10"
        width={865}
        height={201}
        src={decorLine}
        alt="decor-line"
      />
    </div>
  );
};

export default FeaturedBlog;
