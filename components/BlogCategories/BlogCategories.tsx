'use client';

import BlogList from '../BlogList';
import { Blog } from '../BlogSlug/BlogSlug';

const BlogCategories = ({
  blogData,
}: {
  blogData: {
    data: Blog[];
    meta: any;
  };
}) => {
  return (
    <div className="container max-w-[1320px] px-4 pb-10">
      <BlogList withFirstElement blogs={blogData.data} />
    </div>
  );
};

export default BlogCategories;
