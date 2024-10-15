"use client";
import { useEffect, useState } from "react";
import { getRequest } from "@/lib/utils";
import Link from "next/link";
import { RelatedBlogList } from "./RelatedBlogList";

export type BlogSectionsType = "related" | "default";

export interface IReleatedBlogsProps {
  categoriesName?: string;
  excludeBlogId?: string;
  blogSectionType?: BlogSectionsType;
}

const DEFAULT_RELATED_BLOG_ITEMS = 3;

export const RelatedBlogs = ({
  blogSectionType = "default",
  categoriesName = "all",
  excludeBlogId,
}: IReleatedBlogsProps) => {
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  const fetchRelatedBlogs = async () => {
    const relatedData = await getRequest({
      url: `/blogs?take=${DEFAULT_RELATED_BLOG_ITEMS}&category=${categoriesName}${excludeBlogId ? `&excludeId=${excludeBlogId}` : ""}`,
    });
    setRelatedBlogs(relatedData.data);
  };

  useEffect(() => {
    fetchRelatedBlogs();
  }, []);

  if (!relatedBlogs.length) {
    return;
  }

  return (
    <div className="mt-12 max-w-[1328px] mx-auto text-black text-left">
      <div className="flex items-center justify-between">
        {blogSectionType === "related" && (
          <h2 className="text-[20px]/[24px] md:text-[40px]/[44px] flex items-center gap-2 font-light">
            <div className="py-1.5 px-2 bg-[#FEF1DF] rounded-[4px] font-normal">
              <i>Related</i>
            </div>{" "}
            articles:
          </h2>
        )}
        {blogSectionType === "default" && (
          <h2 className="text-[20px]/[24px] md:text-[40px]/[44px] flex items-center gap-2 font-light">
            <div className="py-1.5 px-2 bg-[#FEF1DF] rounded-[4px] font-normal">
              <i>Logistics</i>
            </div>{" "}
            insights:
          </h2>
        )}

        <Link href="/blog">
          <button className="bg-primaryOrange text-white px-4 py-2 rounded-xl">
            <a className="hover:underline">More articles</a>
          </button>
        </Link>
      </div>
      {blogSectionType === "default" && (
        <p className="text-[18px]/[22px] font-light mt-2">
          stay ahead with our blog.
        </p>
      )}
      {relatedBlogs.length > 0 && <RelatedBlogList blogs={relatedBlogs} />}
    </div>
  );
};
