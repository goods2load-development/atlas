"use client";

import { Button } from "@/components/ui/button";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useBlogAdminStore } from "@/lib/store";
import { Edit, MessageCircle, Trash } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";

const TAKE = 5;

const BlogMain = () => {
  const { toast } = useToast();
  const {
    blogs,
    foundBlogs,
    isBlogLoading,
    getBlogs,
    deleteBlog,
    searchBlogs,
  } = useBlogAdminStore();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const isSearchMode = searchValue.length > 1;

  const blogsData = isSearchMode ? foundBlogs : blogs;

  useEffect(() => {
    if (isSearchMode) {
      searchBlogs({ searchTerm: searchValue, page, take: TAKE });
    } else {
      getBlogs({
        page,
        take: TAKE,
      });
    }
  }, [page]);

  useEffect(() => {
    handleSetPage(1);
    if (!isSearchMode) return;

    searchBlogs({ searchTerm: searchValue, page, take: TAKE });
  }, [isSearchMode, searchValue]);

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id)
      .then(() =>
        getBlogs({
          page,
          take: TAKE,
        })
      )
      .then(() =>
        toast({
          title: "Blog deleted.",
          variant: "destructive",
          className: "bg-green-500 text-white",
        })
      );
  };

  const handleSetPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const debouncedSetSearchValue = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 200),
    []
  );

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Blog
        </h1>
        {isBlogLoading && <Spinner />}
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <Input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            debouncedSetSearchValue(e.currentTarget.value)
          }
          className="max-w-[400px] mb-4 mr-auto"
          placeholder="Search..."
        />
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
        {!blogsData?.data?.length && !isBlogLoading && (
          <p className="font-bold text-red-600">No blogs found.</p>
        )}
        {blogsData?.data?.map((post) => (
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

        {blogsData?.meta && blogsData.meta.pageCount > 1 && (
          <Pagination
            page={page}
            total={blogsData.meta.pageCount}
            onPageChange={(newPage) => handleSetPage(newPage)}
          />
        )}
      </div>
    </div>
  );
};

export default BlogMain;
