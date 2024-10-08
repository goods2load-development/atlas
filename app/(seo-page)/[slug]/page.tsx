import { notFound } from "next/navigation";
import SeoPageMain from "@/components/SeoPage/SeoPageMain";
import Footer from "@/components/Footer";

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
      <SeoPageMain type="view" data={data} />
      <Footer />
    </>
  );
}
