import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchMain from "@/components/SearchMain";
import SubHeaderMain from "@/components/SubHeaderMain";
import LogisticInsights from "@/components/LogisticInsights";
import SliderMain from "@/components/SliderMain";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";
import TailoredServices from "@/components/TailoredServices";
import Analytics from "@/components/Dashboard/Analytics";

export default function Home() {
  return (
    <>
      <Header>
        <div className="px-[16px] max-w-[1328px] mx-auto">
          <h1 className="pt-[32px] sm:pt-16 pb-5 text-[38px]/[42px] sm:text-[64px]/[68px] font-light max-w-[1265px] text-center sm:text-left">
            Unlock countless <i className="font-normal">high-quality</i>{" "}
            shipping options with <i className="font-normal">just one click</i>
          </h1>
          <span className="font-light text-[16px]/[20px] sm:text-[24px]/[28px] text-center block sm:text-left px-5 sm:px-16">
            Doing business is never been so easy.
          </span>
        </div>
      </Header>
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main max-w-full">
        <div className="mt-[-270px] sm:mt-[-120px] mb-20 w-full px-[16px] max-w-[1328px] mx-auto">
          <SearchMain main />
        </div>
        <SubHeaderMain />
        <LogisticInsights />
        <TailoredServices />
        <SliderMain />
        <QuestionsAndAnswers />
        <Analytics />
      </main>
      <Footer />
    </>
  );
}
