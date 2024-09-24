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
import { RelatedBlogs } from "@/app/_components/Blog/RelatedBlogs";
import { useUserStore } from "@/lib/store";
import { format } from "date-fns";
import SharedLinks from "@/components/SharedLinks";
import { Referal } from "@/components/Catalogue/Referral";
import TailoredServices from "@/components/TailoredServices";
import ReferalsSlider from "@/components/Catalogue/ReferralsSlider";

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
  const [isMounted, setIsMounted] = useState(false);
  const [localActiveUsers, setLocalActiveUsers] = useState(null);

  const { slug } = params;

  useEffect(() => {
    let data: any;
    setIsMounted(true);
    const fetchBlog = async () => {
      if (!slug) return;
      try {
        data = await getRequest({ url: `/blogs/slug/${slug}` });
        setBlog(data);

        await postRequest({
          url: `/blogs/${data.id}/increment-active-users`,
          data: {
            userId: localStorage.getItem("id"),
          },
        }).then((data) => {
          setLocalActiveUsers(data);
        });

        const { data: relatedData } = await getRequest({ url: "/blogs" });

        setRelatedBlogs(relatedData?.data?.slice(0, 3));

        const categoriesData = await getRequest({ url: "/blog-types" });
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();

    return () => {
      if (isMounted) {
        postRequest({
          url: `/blogs/${data?.id}/decrement-active-users`,
          data: {
            userId: localStorage.getItem("id"),
          },
        });
      }
      setIsMounted(false);
    };
  }, [slug, isMounted]);

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

        <div className="px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 max-w-[1328px] mx-auto">
            {/* Table of Contents */}
            <div className="sticky top-0 z-50">
              <div className="sticky top-0 z-50">
                <TableOfContents headings={headings} />
                <div className="mt-6 hidden md:block">
                  <SharedLinks />
                </div>
                <div className="mt-10 hidden md:block">
                  <Referal forceDisplaying={true} />
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="flex-1">
              <BlogContent
                content={blog.content}
                onHeadingsParsed={setHeadings}
              />
            </div>
          </div>

          <div className="mt-6 md:hidden">
            <ReferalsSlider />
          </div>

          {/* Comments Section */}
          <CommentSection
            blogId={blog.id}
            activeUsers={localActiveUsers || 0}
            commentCount={blog.commentCount}
          />

          {/* Related Blogs Section */}
          <RelatedBlogs
            categoriesName={blog.blogTypeName}
            excludeBlogId={blog?.id}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
