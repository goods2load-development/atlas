import { Suspense } from "react";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";
import AboutUs from "@/components/AboutUs/AboutUs";
import BigLayout from "@/components/BigLayout";

export default function AboutUsPage() {
  return (
    <LoyaltAllWrapper>
      <BigLayout
        title="About us"
        description="We help reduce costs, increase efficiency and offer improved customer service
Company
Trust
"
      >
        <AboutUs />
      </BigLayout>
    </LoyaltAllWrapper>
  );
}
