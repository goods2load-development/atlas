import { termsOfServicePageData } from "./data";
import LegacyPage from "@/components/Legacy/LegacyPage";
import Footer from "@/components/Footer";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

export default function TermsOfServicePage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <LegacyPage {...termsOfServicePageData} />
      <Footer />
    </>
  );
}
