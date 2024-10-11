import { notFound } from "next/navigation";
import SeoPageMain from "@/components/SeoPage/SeoPageMain";
import Footer from "@/components/Footer";

async function getSeoData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/seo-pages/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getSeoData(slug);

  if (!data) {
    return { title: "Not Found" };
  }

  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${data?.slug}`;

  return {
    title: data?.title || "Goods2load",
    description: data?.description || "Goods2load",
    keywords: data?.category?.name || "",
    alternates: {
      canonical,
    },
  };
}

export default async function SeoPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getSeoData(slug);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <SeoPageMain type="view" data={data} />
      <Footer />
    </>
  );
}
