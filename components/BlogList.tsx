import React from "react";

const BlogList = ({ blogs }: { blogs: any[] }) => (
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

export default BlogList;