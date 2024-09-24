import React, { useEffect, useState } from "react";

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
      return {
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.replace("H", ""), 10),
      };
    });

    onHeadingsParsed(headings);

    setParsedContent(doc.body.innerHTML);
  }, [content]);

  return (
    <div className="blog-content p-4">
      <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
    </div>
  );
};

export default BlogContent;
