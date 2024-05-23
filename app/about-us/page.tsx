"use client";
import { Suspense } from "react";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";
import AboutUs from "@/components/AboutUs/AboutUs";

export default function AboutUsPage() {
  return (
    <LoyaltAllWrapper>
      <Suspense>
        <AboutUs />
      </Suspense>
    </LoyaltAllWrapper>
  );
}
