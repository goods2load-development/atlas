"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import FeaturedBlog from "@/components/FeaturedBlog";
import BlogFilter from "@/components/BlogFilter";
import { getRequest } from "@/lib/utils";
import UIButton from "@/components/common/Button";
import decorLine from "@/assets/Blog/blog-decor-line.svg";
import Image from "next/image";

interface Blog {
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
}

interface BlogType {
  id: string;
  name: string;
}

enum BlogFilters {
  NEWS = "Newest",
  POPULAR = "Popular",
}

const DEFAULT_BLOG_ITEMS = 5;

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filter, setFilter] = useState<string>(BlogFilters.NEWS);
  const [takeBlogs, setTakeBlogs] = useState<number>(DEFAULT_BLOG_ITEMS);
  const [blogsMeta, setBlogsMeta] = useState<any>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getRequest({
          url: `blogs?take=${takeBlogs}&category=${selectedCategory}&filter=${filter}`,
        });
        if (response && Array.isArray(response.data)) {
          setBlogs(response.data);
          setBlogsMeta(response.meta);
        } else {
          console.error("Unexpected data format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [takeBlogs, filter, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: BlogType[] = await getRequest({ url: "blog-types" });
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="flex relative flex-col w-full items-center justify-center bg-cover bg-center text-white sm:mt-[-75px] pb-[104px] overflow-hidden">
        <div className="flex flex-col w-full items-center justify-center sm:pt-[47px] sm:bg-hero-pattern bg-cover bg-bottom text-white sm:pb-[240px] md:pb-[230px] pb-[80px] realtive h-[350px] sm:h-[540px] relative">
          <h1 className="text-[38px]/[42px] sm:text-[64px] sm:leading-[70px] font-light mb-8 sm:mb-2 sm:pt-[120px]">
            Blog
          </h1>
          <div className="sm:hidden absolute w-full h-[425px] bg-primaryOrange bg-hero-pattern-mobile bg-cover bg-no-repeat -z-10"></div>
          <div className="md:hidden 2xl:block absolute bottom-0 w-full h-[150px] bg-bgWhiteGradient"></div>
        </div>
        <Image
          className="absolute xl:top-[22.5%] top-[24%] right-[0] xl:w-[53%] w-[50%] md:block hidden"
          width={865}
          height={201}
          src={decorLine}
          alt="decor-line"
        />
        <div className="container mx-auto px-4 md:py-8 max-w-[1328px] text-black">
          {blogs.length > 0 && (
            <FeaturedBlog blog={blogs[0]} categories={categories} />
          )}
          <BlogFilter
            filter={filter}
            setFilter={setFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
          <BlogList blogs={blogs} categories={categories} />
          {blogsMeta && blogsMeta.hasNextPage && (
            <div className="text-center pb-5 mt-8">
              <UIButton
                onClick={() => setTakeBlogs((take) => take + 2)}
                secondary
              >
                Show more results
              </UIButton>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
