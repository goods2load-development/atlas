"use client";
import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchMain from "@/components/SearchMain";
import SubHeaderMain from "@/components/SubHeaderMain";
import LogisticInsights from "@/components/LogisticInsights";
import SliderMain from "@/components/SliderMain";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";
import CompanyLeader from "./_components/Company/CompanyLeadership/CompanyLeader";
import CompanyContainer from "./_components/Company/CompanyContainer/CompanyContainer";

export default function Home() {
  return (
    <><>
      {/* <Header>
        <h1 className="pt-16 pb-5 text-[64px]/[60px] font-light">
          Unlock countless <i>high-quality</i> shipping options with{" "}
          <i>just one click</i>
        </h1>
        <span className="font-light text-[24px]/[28px]">
          Doing business is never been so easy.
        </span>
      </Header> */}
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main">
        <div className="px-16 mt-[-120px] mb-20">
          <SearchMain />
        </div>
        <SubHeaderMain />
        <LogisticInsights />
        <SliderMain />
        <QuestionsAndAnswers />
      </main>
      <Footer />
    </><main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <CompanyContainer /> */}
      </main></>
  );
}
