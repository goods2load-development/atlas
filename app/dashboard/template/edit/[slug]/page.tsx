import { notFound } from "next/navigation";
import SeoPageMain from "@/components/SeoPage/SeoPageMain";
import Footer from "@/components/Footer";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

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
      <HeaderClient />
      <DynamicMenu variant="secondary" />
      <SeoPageMain type="edit" data={data} />
      <Footer />
    </>
  );
}
