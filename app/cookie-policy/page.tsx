"use client";

import { cookiePolicyPageData } from "./data";
import LegacyPage from "@/components/Legacy/LegacyPage";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

export default function CookiePolicyPage() {
  return (
    <LoyaltAllWrapper headerVariant="secondary">
      <LegacyPage {...cookiePolicyPageData} />
    </LoyaltAllWrapper>
  );
}
