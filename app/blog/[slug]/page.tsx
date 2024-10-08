import BlogSlug from "@/components/BlogSlug/BlogSlug";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [blog] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/blogs/slug/${slug}`, {
      cache: "no-store",
    }).then((res) => res.json()),
  ]);

  metadata.title = blog.title;
  metadata.description = blog.description;
  metadata.authors = blog.authorName;

  return (
    <>
      <Header variant="secondary" />
      <BlogSlug blog={blog} />
      <Footer />
    </>
  );
}
