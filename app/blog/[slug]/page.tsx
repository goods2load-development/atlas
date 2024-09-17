"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HeaderImage from "@/components/HeaderImage";
import TableOfContents from "@/components/TableOfContents";
import BlogContent from "@/components/BlogContent";
import CommentSection from "@/components/CommentSection";
import { getRequest, postRequest } from "@/lib/utils";
import Loader from "@/components/common/Loader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { RelatedBlogs } from "@/app/_components/Blog/RelatedBlogs";
import { useUserStore } from "@/lib/store";
import { format } from "date-fns";

interface BlogComment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  replies: BlogComment[];
}

export interface Blog {
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
  comments: BlogComment[];
  activeUsers: number;
  commentCount: number;
}

export interface BlogType {
  id: string;
  name: string;
}

const BlogPage: React.FC = ({ params }: any) => {
  const { user }: any = useUserStore();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogType[]>([]);
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const searchParams = useSearchParams();

  const { slug } = params;

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      try {
        const data = await getRequest({ url: `/blogs/slug/${slug}` });
        setBlog(data);

        await postRequest({
          url: `/blogs/${data.id}/increment-active-users`,
          data: {
            userId: user.id,
          },
        });

        const relatedData = await getRequest({ url: "/blogs" });
        setRelatedBlogs(relatedData.slice(0, 3));

        const categoriesData = await getRequest({ url: "/blog-types" });
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!blog) return <Loader />;

  return (
    <>
      <Header />
      <div className="blog-page">
        {/* Header Section */}
        <HeaderImage
          title={blog.title}
          mainImageUrl={blog.mainImageUrl}
          category={blog.blogTypeName}
          authorName={blog.authorName || "Unknown Author"}
          readingTime={blog.readingTime}
          publishDate={format(new Date(blog.createdAt), "dd MMM yyyy")}
        />

        <div className="px-4 py-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Table of Contents */}
            <div className="md:w-64 sticky top-0">
              <TableOfContents headings={headings} />
            </div>

            {/* Blog Content */}
            <div className="flex-1">
              <BlogContent
                content={blog.content}
                onHeadingsParsed={setHeadings}
              />
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection
            blogId={blog.id}
            activeUsers={blog.activeUsers}
            commentCount={blog.commentCount}
          />

          {/* Related Blogs Section */}
          <RelatedBlogs categoriesName={blog.blogTypeName} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
