import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

interface BlogFilterProps {
  filter: any;
  setFilter: any;
  selectedCategory: any;
  setSelectedCategory: any;
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  filter,
  setFilter,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
  };

  return (
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
  );
};

export default BlogFilter;