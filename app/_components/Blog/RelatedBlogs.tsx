"use client";
import { useEffect, useState } from "react";
import { getRequest } from "@/lib/utils";
import { type Blog } from "@/app/blog/[slug]/page";
import Link from "next/link";
import BlogList from "@/components/BlogList";
import { RelatedBlogList } from "./RelatedBlogList";

export interface IReleatedBlogsProps {
  categoriesName?: string;
}

const DEFAULT_RELATED_BLOG_ITEMS = 3;

export const RelatedBlogs = ({
  categoriesName = "all",
}: IReleatedBlogsProps) => {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  const fetchRelatedBlogs = async () => {
    const relatedData = await getRequest({
      url: `/blogs?take=${DEFAULT_RELATED_BLOG_ITEMS}&category=${categoriesName}`,
    });
    setRelatedBlogs(relatedData.data);
  };

  useEffect(() => {
    fetchRelatedBlogs();
  }, []);

  useEffect(() => {
    console.log(relatedBlogs);
  }, [relatedBlogs]);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px]/[24px] md:text-[40px]/[44px] flex items-center gap-2 font-light">
          <div className="p-1 bg-lightOrange rounded-[2px] font-normal">
            <i>Related</i>
          </div>{" "}
          Articles
        </h2>
        <Link href="/blog">
          <button className="bg-primaryOrange text-white px-4 py-2 rounded-xl">
            <a className="hover:underline">More articles</a>
          </button>
        </Link>
      </div>
      {relatedBlogs.length > 0 && <RelatedBlogList blogs={relatedBlogs} />}
    </div>
  );
};
