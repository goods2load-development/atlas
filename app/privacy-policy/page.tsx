"use client";

import { privacyPolicyPageData } from "./data";
import LegacyPage from "@/components/Legacy/LegacyPage";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

export default function PrivacyPolicyPage() {
  return (
    <LoyaltAllWrapper headerVariant="secondary">
      <LegacyPage {...privacyPolicyPageData} />
    </LoyaltAllWrapper>
  );
}
