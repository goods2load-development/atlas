'use client';

import BlogList from '../BlogList';
import { Blog } from '../BlogSlug/BlogSlug';
import UIButton from '../common/Button';
import { getRequest } from '@/lib/utils';

import { useEffect, useState } from 'react';

const DEFAULT_BLOG_ITEMS = 4;

const BlogCategories = ({
  blogData,
  category,
}: {
  blogData: {
    data: Blog[];
    meta: any;
  };
  category: string;
}) => {
  const [takeBlogs, setTakeBlogs] = useState<number>(DEFAULT_BLOG_ITEMS);
  const [blogs, setBlogs] = useState<Blog[]>(blogData.data);
  const [blogsMeta, setBlogsMeta] = useState<any>(blogData.meta);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getRequest({
          url: `blogs?take=${takeBlogs}&category=${category}&filter=Newfest`,
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
  }, [takeBlogs]);

  return (
    <div className="container max-w-[1320px] px-4 pb-10">
      <BlogList withFirstElement blogs={blogs} />
      {blogsMeta && blogsMeta.hasNextPage && (
        <div className="text-center pb-5 mt-8">
          <UIButton onClick={() => setTakeBlogs((take) => take + 2)} secondary>
            Show more results
          </UIButton>
        </div>
      )}
    </div>
  );
};

export default BlogCategories;
