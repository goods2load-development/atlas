import { Metadata } from "next";
import { headers } from "next/headers";
import BlogSlug from "@/components/BlogSlug/BlogSlug";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";

async function getBlogData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs/slug/${slug}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogData(slug);
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const canonical = `${protocol}://${host}/blog/${slug}`;

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: blog.authorName }],
    keywords: blog.blogTypeName?.split(", "),
    alternates: {
      canonical,
    },
  };
}

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blog = await getBlogData(slug);

  return (
    <>
      <Header variant="secondary" />
      <BlogSlug blog={blog} />
      <Footer />
    </>
  );
}
