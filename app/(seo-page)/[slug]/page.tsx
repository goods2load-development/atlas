import { notFound } from "next/navigation";
import SeoPageMain from "@/components/SeoPage/SeoPageMain";
import Footer from "@/components/Footer";
import MainLayout from "@/components/MainLayout";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

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
      <MainLayout>
        <HeaderClient variant="transparent" />
        <DynamicMenu variant="transparent" />
        <div className="px-4 max-w-[1328px] mx-auto">
          <h1 className="mt-8 sm:mt-16 mb-5 text-[38px]/[42px] sm:text-[64px]/[68px] font-light max-w-[1265px] text-center sm:text-left">
            {data?.title}
          </h1>
          <p className="font-light max-w-[916px] text-lg text-center block sm:text-left">
            {data?.description}
          </p>
        </div>
      </MainLayout>
      <SeoPageMain type="view" data={data} />
      <Footer />
    </>
  );
}
