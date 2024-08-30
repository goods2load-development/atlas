"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import FeaturedBlog from "@/components/FeaturedBlog";
import BlogFilter from "@/components/BlogFilter";
import { mockBlogs } from "@/assets/Mock/Mock"; 

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState("Recent");

  const filteredBlogs = selectedCategory
    ? mockBlogs.filter((blog) => blog.category === selectedCategory)
    : mockBlogs.slice(1);

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
        <FeaturedBlog blog={mockBlogs[0]} />
        <BlogFilter
          filter={filter}
          setFilter={setFilter}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <BlogList blogs={filteredBlogs} />
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;