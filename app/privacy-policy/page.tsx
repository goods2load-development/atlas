import { Metadata } from "next";
import { privacyPolicyPageData } from "./data";
import LegacyPage from "@/components/Legacy/LegacyPage";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <LegacyPage {...privacyPolicyPageData} />
      <Footer />
    </>
  );
}
