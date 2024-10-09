import { notFound } from "next/navigation";
import SeoPageMain from "@/components/SeoPage/SeoPageMain";
import Footer from "@/components/Footer";
import Head from "next/head";

export default async function SeoPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/seo-pages/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <title>{data?.title || "Goods2load"}</title>
        <meta name="description" content={data?.description || "Goods2load"} />
        <meta name="keywords" content={data?.category.name || ""} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CLIENT_URL}${data?.slug}`}
          key="canonical"
        />
      </Head>
      <SeoPageMain type="view" data={data} />
      <Footer />
    </>
  );
}
