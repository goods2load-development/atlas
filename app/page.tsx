import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchMain from "@/components/SearchMain";
import SubHeaderMain from "@/components/SubHeaderMain";
import LogisticInsights from "@/components/LogisticInsights";
// import SliderMain from "@/components/SliderMain";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-74 justify-between colored-main">
      <Header>
        <h1 className="pt-[45px] pb-[15px] text-[64px]/[60px] font-light">
          Unlock countless <i>high-quality</i> shipping options with{" "}
          <i>just one click</i>
        </h1>
        <div className="pb-[160px] font-light text-[24px]/[28px]">
          Doing business is never been so easy.
        </div>
      </Header>
      <div className="px-16 mt-[-120px] mb-[60px]">
        <SearchMain />
      </div>
      <SubHeaderMain />
      <LogisticInsights />
      {/* styling not finished */}
      {/* <SliderMain /> */}
      <QuestionsAndAnswers />
      <Footer />
    </main>
  );
}
