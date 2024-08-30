import React from "react";

const FeaturedBlog = ({ blog }: { blog: any }) => (
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

export default FeaturedBlog;