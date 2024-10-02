import { notFound } from "next/navigation";
import SeoPageMain from "@/components/SeoPage/SeoPageMain";
import Footer from "@/components/Footer";

export default async function SeoPage() {
  return (
    <>
      <SeoPageMain type="create" />
      <Footer />
    </>
  );
}
