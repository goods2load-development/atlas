"use client";
import AboutUsContainer from "@/app/_components/AboutUsContainer";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

export default function AboutUs() {
  return (
    <LoyaltAllWrapper>
      <div className="w-full">
        <AboutUsContainer />
      </div>
    </LoyaltAllWrapper>
  );
}
