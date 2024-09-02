"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import FeaturedBlog from "@/components/FeaturedBlog";
import BlogFilter from "@/components/BlogFilter";
import { getRequest } from "@/lib/utils"; 

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

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filter, setFilter] = useState<string>("Newest");

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getRequest({ url: "blogs" });
        const sortedBlogs = data.sort((a: Blog, b: Blog) => {
          if (b.weight === a.weight) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return b.weight - a.weight;
        });
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch categories (blog types)
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

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.blogTypeId === selectedCategory)
    : blogs;

  const sortedFilteredBlogs = filteredBlogs.sort((a, b) => {
    if (filter === "Newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (filter === "Popular") {
      return b.weight - a.weight;
    }
    return 0;
  });

  return (
    <>
      <Header>
        <div className="px-[16px] max-w-[1328px] mx-auto text-center">
          <h1 className="pt-16 pb-5 text-[64px]/[68px] font-light max-w-[1265px] mx-auto">
            Blog
          </h1>
        </div>
      </Header>
      <div className="container mx-auto px-4 py-8 max-w-85%">
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
        <BlogList blogs={sortedFilteredBlogs} categories={categories} /> 
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
