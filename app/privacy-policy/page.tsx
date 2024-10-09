import { Metadata } from "next";
import { privacyPolicyPageData } from "./data";
import LegacyPage from "@/components/Legacy/LegacyPage";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPolicyPage() {
  return (
    <LoyaltAllWrapper headerVariant="secondary">
      <LegacyPage {...privacyPolicyPageData} />
    </LoyaltAllWrapper>
  );
}
