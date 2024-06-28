import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchMain from "@/components/SearchMain";
import SubHeaderMain from "@/components/SubHeaderMain";
import LogisticInsights from "@/components/LogisticInsights";
import SliderMain from "@/components/SliderMain";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";

export default function Home() {
  return (
    <>
      <Header>
        <h1 className="pt-[32px] sm:pt-16 pb-5 text-[38px]/[42px] sm:text-[64px]/[68px] font-light max-w-[1115px] text-center sm:text-left px-5 sm:px-16">
          Unlock countless <i className="font-normal">high-quality</i> shipping
          options with <i className="font-normal">just one click</i>
        </h1>
        <span className="font-light text-[16px]/[20px] sm:text-[24px]/[28px] text-center block sm:text-left px-5 sm:px-16">
          Doing business is never been so easy.
        </span>
      </Header>
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main">
        <div className="px-2 sm:px-16 mt-[-160px] sm:mt-[-120px] mb-20 max-w-[1190px] mx-auto">
          <SearchMain main />
        </div>
        <SubHeaderMain />
        <LogisticInsights />
        <SliderMain />
        <QuestionsAndAnswers />
      </main>
      <Footer />
    </>
  );
}
