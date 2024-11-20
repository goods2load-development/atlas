'use client';

import { format } from 'date-fns';
import Link from 'next/link';

interface IRelatedBlogsList {
  blogs: any[];
}

export const RelatedBlogList = ({ blogs }: IRelatedBlogsList) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
      {blogs.map((blog) => {
        const blogImg = blog.mainImageUrl
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${blog.mainImageUrl}`
          : '/default-image.jpg';

        return (
          <div
            key={blog.id}
            className="bg-white rounded-lg overflow-hidden flex flex-col justify-between"
          >
            <div className="relative">
              <img
                className="w-full h-[285px] object-cover rounded-lg"
                src={blogImg}
                alt={blog.title}
              />
              <Link
                href={`/blog-category/${blog.blogTypeName}`}
                className="absolute top-0 left-0 m-4 bg-orange-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-lg"
              >
                {blog?.blogTypeName || 'all'}
              </Link>
            </div>
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <Link
                  href={{
                    pathname: `/blog/${blog.slug}`,
                  }}
                >
                  <h3 className="text-[24px]/[28px] font-medium mb-2">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 h-[96px] line-clamp-4">
                  {blog.description}
                </p>
              </div>
              <div className="text-gray-500 text-sm flex justify-between">
                <span>{format(new Date(blog.updatedAt), 'dd MMM yyyy')}</span>
                <span>{`${blog.readingTime} min read`}</span>
              </div>
              <Link
                href={{
                  pathname: `/blog/${blog.slug}`,
                }}
                className="text-orange-500 hover:underline mt-4 inline-block self-start"
              >
                Know more →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
