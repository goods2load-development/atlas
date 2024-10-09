import React, { useEffect, useState } from "react";
import "@/app/content.css";

interface BlogContentProps {
  content: string;
  onHeadingsParsed: (
    headings: { id: string; text: string; level: number }[]
  ) => void;
}

const replaceH1Duplicate = (html: string) => html.replace(/h1/g, "h2");

const BlogContent: React.FC<BlogContentProps> = ({
  content,
  onHeadingsParsed,
}) => {
  const [parsedContent, setParsedContent] = useState<string>("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      replaceH1Duplicate(content),
      "text/html"
    );
    const headings = Array.from(
      doc.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute("id", id);
      heading.classList.add(`heading-${heading.tagName.toLowerCase()}`);
      return {
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.replace("H", ""), 10),
      };
    });

    const uls = Array.from(doc.querySelectorAll("ul")).map((ul, index) => {
      return ul.classList.add(`ul-dynamic-content`);
    });

    const ols = Array.from(doc.querySelectorAll("ol")).map((ol, index) => {
      return ol.classList.add(`ol-dynamic-content`);
    });

    onHeadingsParsed(headings);

    setParsedContent(doc.body.innerHTML);
  }, [content]);

  return (
    <div className="content blog-content p-4">
      <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
    </div>
  );
};

export default BlogContent;
