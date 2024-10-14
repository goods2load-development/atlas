import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Sitemap from "@/components/Sitemap/Sitemap";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

export default function SitemapPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Sitemap />
      <Footer />
    </>
  );
}
