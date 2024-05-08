"use client";

import { termsOfServicePageData } from "./data";
import LegacyPage from "@/components/Legacy/LegacyPage";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

export default function TermsOfServicePage() {
  return (
    <LoyaltAllWrapper>
      <LegacyPage {...termsOfServicePageData} />
    </LoyaltAllWrapper>
  );
}
