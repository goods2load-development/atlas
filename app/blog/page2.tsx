"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

const mockBlogs = [
  {
    id: 1,
    title: "LocaLand at BLU Dubai",
    description: "Experience the thrill of LocaLand at BLU Dubai, the ultimate party destination.",
    date: "29 Aug 2024",
    readingTime: "6 min read",
    imageUrl: "https://production-dubainight.s3.me-south-1.amazonaws.com/region_dubai/misc/Bailando-at-Tatel-Dubai.webp-4327-2024-08-29.webp",
    category: "Parties",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur",
    description: "Amet venenatis aliquam nunc enim massa ac. Leo eu diam quam amet ornare justo bibendum.",
    date: "03 Apr 2024",
    readingTime: "9 min read",
    imageUrl: "https://production-dubainight.s3.me-south-1.amazonaws.com/region_dubai/misc/Bailando-at-Tatel-Dubai.webp-4327-2024-08-29.webp",
    category: "Category Title",
  },
  {
    id: 3,
    title: "Retro at Vault Dubai",
    description: "Step back in time with Retro at Vault Dubai, featuring classic hits and vibes.",
    date: "29 Aug 2024",
    readingTime: "4 min read",
    imageUrl: "https://production-dubainight.s3.me-south-1.amazonaws.com/region_dubai/misc/Bailando-at-Tatel-Dubai.webp-4327-2024-08-29.webp",
    category: "Retro",
  },
  {
    id: 4,
    title: "Afro Dose at SOT Dubai",
    description: "Feel the rhythm with Afro Dose at SOT Dubai, where Afro beats take center stage.",
    date: "29 Aug 2024",
    readingTime: "4 min read",
    imageUrl: "https://production-dubainight.s3.me-south-1.amazonaws.com/region_dubai/misc/Bailando-at-Tatel-Dubai.webp-4327-2024-08-29.webp",
    category: "Cultural",
  },
  {
    id: 5,
    title: "Moonlight Sessions by Cloud 22 Dubai",
    description: "Enjoy the enchanting Moonlight Sessions by Cloud 22 in Dubai.",
    date: "29 Aug 2024",
    readingTime: "5 min read",
    imageUrl: "https://production-dubainight.s3.me-south-1.amazonaws.com/region_dubai/misc/Bailando-at-Tatel-Dubai.webp-4327-2024-08-29.webp",
    category: "Sessions",
  },
  {
    id: 6,
    title: "Simone Vitullo Live at Cavo Dubai",
    description: "Enjoy a mesmerizing night with Simone Vitullo live at Cavo in Dubai.",
    date: "29 Aug 2024",
    readingTime: "7 min read",
    imageUrl: "https://production-dubainight.s3.me-south-1.amazonaws.com/region_dubai/misc/Bailando-at-Tatel-Dubai.webp-4327-2024-08-29.webp",
    category: "Events",
  },
];

const FeaturedBlog = ({ blog }) => (
  <div className="relative mb-8 flex flex-col md:flex-row gap-6 items-center bg-white rounded-lg overflow-hidden w-full">
    <div className="relative w-full md:w-1/2 h-0 pb-[56.25%] md:pb-[40%]">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
      />
    </div>
    <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center">
      <div className="flex items-center">
        <span className="bg-orange-500 text-white text-sm font-semibold mb-2 px-2 py-1 rounded-lg">
          {blog.category}
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.description}</p>
      <div className="flex justify-between text-gray-500 text-sm">
        <span>{blog.date}</span>
        <span>{blog.readingTime}</span>
      </div>
    </div>
  </div>
);

const BlogList = ({ blogs }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
    {blogs.map((blog) => (
      <div key={blog.id} className="bg-white rounded-lg overflow-hidden flex flex-col justify-between">
        <div className="relative">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src={blog.imageUrl}
            alt={blog.title}
          />
          <div className="absolute top-0 left-0 m-4 bg-orange-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-lg">
            {blog.category}
          </div>
        </div>
        <div className="p-4 flex flex-col h-full justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.description}</p>
          </div>
          <div className="text-gray-500 text-sm flex justify-between">
            <span>{blog.date}</span>
            <span>{blog.readingTime}</span>
          </div>
          <a href="#" className="text-orange-500 hover:underline mt-4 inline-block self-start">
            Know more →
          </a>
        </div>
      </div>
    ))}
  </div>
);

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState("Recent");
  const filteredBlogs = selectedCategory
    ? mockBlogs.filter((blog) => blog.category === selectedCategory)
    : mockBlogs.slice(1);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

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
        <div className="flex flex-wrap justify-center sm:justify-between items-center mt-8">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 py-4">
            {["Category Title", "Parties", "Events", "Cultural", "Sessions"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 border-gray-300"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-2">
              <span className="text-gray-600">Filter by: {filter}</span>
              <ChevronDown />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white rounded p-1 mt-1 z-50 shadow-lg right-0">
              {["Recent", "Popular"].map((item) => (
                <DropdownMenu.Item
                  key={item}
                  className="cursor-pointer p-2 rounded hover:bg-orange-500 hover:text-white"
                  onSelect={() => handleFilterChange(item)}
                >
                  {item}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <BlogList blogs={filteredBlogs} />
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
