"use client";
import { type FC, memo, useState } from "react";

import CompanyContainer from "@/app/_components/Company/CompanyContainer/CompanyContainer";
import TrustContainer from "@/app/_components/Trust/TrustContainer/TrustContainer";
import MediaContainer from "@/app/_components/MediaContainer/MediaContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutUsContainer: FC = () => {
  const [tab, setTab] = useState("company");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center pt-[47px] bg-hero-pattern bg-cover bg-center text-white text-center ">
        <h1 className="text-[64px] leading-[70px] font-light mb-2 pt-[120px]">
          About <span className="italic font-normal">us</span>
        </h1>
        <h2 className="mb-[68px] text-[17px]/[28px] font-light">
          We help reduce costs, increase efficiency and offer improved customer
          service
        </h2>
        <div className="flex w-fit pb-[190px]">
          <Tabs value={tab} onValueChange={onTabChange}>
            <TabsList>
              <TabsTrigger
                className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${tab === "company" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
                value="company"
              >
                Company
              </TabsTrigger>
              <TabsTrigger
                className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${tab === "trust" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
                value="trust"
              >
                Trust
              </TabsTrigger>

              <TabsTrigger
                className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${tab === "media" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
                value="media"
              >
                Media
              </TabsTrigger>
            </TabsList>
            <TabsContent value="company">
              <CompanyContainer />
            </TabsContent>
            <TabsContent value="trust">
              <TrustContainer />
            </TabsContent>
            <TabsContent className="relative" value="media">
              <MediaContainer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default memo(AboutUsContainer);
