import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

interface BlogFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: { id: string; name: string }[];
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  filter,
  setFilter,
  selectedCategory,
  setSelectedCategory,
  categories,  // Receive categories here
}) => {
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-between items-center mt-8">
      <div className="flex flex-wrap justify-center sm:justify-start gap-2 py-4">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === ""
              ? "bg-orange-500 text-white"
              : "text-gray-600 border-gray-300"
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category.id
                ? "bg-orange-500 text-white"
                : "text-gray-600 border-gray-300"
            }`}
          >
            {category.name}  {/* Render category name */}
          </button>
        ))}
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center gap-2">
          <span className="text-gray-600">Filter by: {filter}</span>
          <ChevronDown />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white rounded p-1 mt-1 z-50 shadow-lg right-0">
          {["Newest", "Popular"].map((item) => (
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
  );
};

export default BlogFilter;