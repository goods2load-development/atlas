"use client";

import { Button } from "@/components/ui/button";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { useBlogAdminStore } from "@/lib/store";
import { Edit, MessageCircle, Trash } from "lucide-react";

const BlogMain = () => {
  const { toast } = useToast();
  const { blogs, isBlogLoading, getBlogs, deleteBlog } = useBlogAdminStore();

  useEffect(() => {
    getBlogs();
  }, []);

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id)
      .then(() => getBlogs())
      .then(() =>
        toast({
          title: "Blog deleted.",
          variant: "destructive",
          className: "bg-green-500 text-white",
        })
      );
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Blog
        </h1>
        {isBlogLoading && <Spinner />}
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <Link href="/dashboard/blog/create">
          <Button>Add new blog</Button>
        </Link>
        <Link href="/dashboard/blog/approve-comments">
          <Button>Check new comments</Button>
        </Link>
        <Link href="/dashboard/blog/categories">
          <Button>Categories</Button>
        </Link>
      </div>
      <div
        className={clsx("flex flex-col gap-4", {
          "pointer-events-none": isBlogLoading,
        })}
      >
        {blogs?.data?.map((post) => (
          <ListItem key={post.id}>
            <div className="w-full flex justify-between gap-2">
              <Link
                className="hover:underline font-bold"
                href={`/blog/${post.slug}`}
              >
                {post.title} | {post.blogTypeName}
              </Link>

              <div className="flex gap-2">
                <Link
                  title="check comments"
                  href={`/dashboard/blog/${post.id}/comments`}
                >
                  <MessageCircle />
                </Link>
                <Link
                  title="edit blog"
                  href={`/dashboard/blog/edit/${post.id}`}
                >
                  <Edit />
                </Link>
                <button
                  onClick={() => handleDeleteBlog(post.id)}
                  title="delete blog"
                >
                  <Trash />
                </button>
              </div>
            </div>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default BlogMain;
