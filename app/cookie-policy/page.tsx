import { cookiePolicyPageData } from "./data";
import LegacyPage from "@/components/Legacy/LegacyPage";
import Footer from "@/components/Footer";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

export default function CookiePolicyPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <LegacyPage {...cookiePolicyPageData} />
      <Footer />
    </>
  );
}
