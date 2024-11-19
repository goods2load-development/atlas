'use client';

import { getRequest } from '@/lib/utils';

import React, { useEffect, useState } from 'react';

import BlogFilter from '@/components/BlogFilter';
import BlogList from '@/components/BlogList';
import FeaturedBlog from '@/components/FeaturedBlog';
import UIButton from '@/components/common/Button';

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

enum BlogFilters {
  NEWS = 'Newest',
  POPULAR = 'Popular',
}

const DEFAULT_BLOG_ITEMS = 5;

const BlogPage = ({
  categories,
  blogData,
}: {
  categories: BlogType[];
  blogData: {
    data: Blog[];
    meta: any;
  };
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(blogData.data);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filter, setFilter] = useState<string>(BlogFilters.NEWS);
  const [takeBlogs, setTakeBlogs] = useState<number>(DEFAULT_BLOG_ITEMS);
  const [blogsMeta, setBlogsMeta] = useState<any>(blogData.meta);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getRequest({
          url: `blogs?take=${takeBlogs}&category=${selectedCategory}&filter=${filter}`,
        });
        if (response && Array.isArray(response.data)) {
          setBlogs(response.data);
          setBlogsMeta(response.meta);
        } else {
          console.error('Unexpected data format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, [takeBlogs, filter, selectedCategory]);

  return (
    <div className="mx-auto md:py-8 text-black w-full">
      {blogs.length > 0 && (
        <FeaturedBlog blog={blogs[0]} categories={categories} />
      )}
      <div className="container max-w-[1320px] px-4">
        <BlogFilter
          filter={filter}
          setFilter={setFilter}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <BlogList blogs={blogs} />
        {blogsMeta && blogsMeta.hasNextPage && (
          <div className="text-center pb-5 mt-8">
            <UIButton
              onClick={() => setTakeBlogs((take) => take + 2)}
              secondary
            >
              Show more results
            </UIButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
