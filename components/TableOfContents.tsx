import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true); // Default open

  // Toggle TOC content visibility
  const toggleTOC = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (id: string, index: number) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offsetY = window.scrollY + rect.top - window.innerHeight / 2;
      window.scrollTo({
        top: offsetY,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="p-4 w-full bg-white shadow-lg md:w-auto md:top-0">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleTOC}
      >
        <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <hr className="border-orange-500 mb-4 border-t-4" />
      {isOpen && (
        <ul className="list-none space-y-4 max-h-[60vh] overflow-auto">
          {" "}
          {/* Scrollable on long content */}
          {headings.map((heading, index) => (
            <li
              key={heading.id}
              className="flex items-center cursor-pointer"
              onClick={() => handleClick(heading.id, index)}
            >
              {activeIndex === index ? (
                <span className="min-w-4 min-h-4 bg-orange-500 rounded-full mr-2"></span>
              ) : (
                <span className="min-w-4 min-h-4 border-2 border-gray-400 rounded-full mr-2"></span>
              )}
              <span
                className={`truncate max-w-full whitespace-nowrap overflow-hidden ${
                  activeIndex === index ? "font-semibold" : ""
                }`}
                style={{ marginLeft: `${(heading.level - 1) * 10}px` }}
                title={heading.text}
              >
                {heading.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableOfContents;
