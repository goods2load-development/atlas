import Link from "next/link";
import React from "react";

interface Blog {
  id: string;
  title: string;
  description: string;
  mainImageUrl: string;
  createdAt: string;
  readingTime: number;
  blogTypeId: string;
  slug: string;
}

interface BlogType {
  id: string;
  name: string;
}

interface BlogListProps {
  blogs: Blog[];
  categories: BlogType[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs, categories }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
    {blogs.map((blog) => {
      const category =
        categories?.find((cat) => cat.id === blog.blogTypeId)?.name ||
        "Uncategorized";

      const blogImg = blog.mainImageUrl
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${blog.mainImageUrl}`
        : "/default-image.jpg";

      return (
        <div
          key={blog.id}
          className="bg-white rounded-lg overflow-hidden flex flex-col justify-between"
        >
          <div className="relative">
            <img
              className="w-full h-64 object-cover rounded-lg"
              src={blogImg}
              alt={blog.title}
            />
            <div className="absolute top-0 left-0 m-4 bg-orange-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-lg">
              {category}
            </div>
          </div>
          <div className="p-4 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
            </div>
            <div className="text-gray-500 text-sm flex justify-between">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>{`${blog.readingTime} min read`}</span>
            </div>
            <Link
              href={{
                pathname: `/blog/${blog.slug}`,
                query: { id: blog.id },
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

export default BlogList;
