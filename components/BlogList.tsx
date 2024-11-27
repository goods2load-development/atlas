import { slugify } from '@/lib/utils';

import { format } from 'date-fns';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  description: string;
  mainImageUrl: string;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  blogTypeName: string;
  blogTypeId: string;
  slug: string;
}
interface BlogListProps {
  blogs: Blog[];
  withFirstElement?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  withFirstElement = false,
}) => {
  const blogsWithOutFirstElement = blogs.slice(1);
  const list = withFirstElement ? blogs : blogsWithOutFirstElement;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
      {list.map((blog) => {
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
                href={`/category/${slugify(blog.blogTypeName)}`}
                className="absolute top-0 left-0 m-4 bg-orange-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-lg"
              >
                {blog?.blogTypeName || 'all'}
              </Link>
            </div>
            <div className="p-4 flex flex-col h-full justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2 text-black">
                  <Link
                    href={{
                      pathname: `/blog/${blog.slug}`,
                    }}
                    className="block"
                  >
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
              </div>
              <div className="text-gray-500 text-sm flex justify-between">
                <span>{format(new Date(blog?.updatedAt), 'dd MMM yyyy')}</span>
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

export default BlogList;
