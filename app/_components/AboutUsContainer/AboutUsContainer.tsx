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
      <div className="flex relative flex-col w-full items-center justify-center pt-[47px]  bg-cover bg-center text-white text-center ">
        <div className="absolute top-[-100px] flex flex-col w-full items-center justify-center pt-[47px] bg-hero-pattern bg-cover bg-center text-white text-center pb-[300px]">
          <h1 className="text-[64px] leading-[70px] font-light mb-2 pt-[120px]">
            About <span className="italic font-normal">us</span>
          </h1>
          <h2 className="mb-[68px] text-[17px]/[28px] font-light">
            We help reduce costs, increase efficiency and offer improved
            customer service
          </h2>
        </div>

        <div className="flex w-fit pb-[190px] pt-[200px]">
          <Tabs value={tab} onValueChange={onTabChange}>
            <TabsList>
              <TabsTrigger
                className={`w-[260px] text-center italic bg-black text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${tab === "company" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
                value="company"
                style={{ backgroundColor: "transparent", color: "white" }}
              >
                Company
              </TabsTrigger>
              <TabsTrigger
                className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${tab === "trust" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
                value="trust"
                style={{ backgroundColor: "transparent", color: "white" }}
              >
                Trust
              </TabsTrigger>

              <TabsTrigger
                className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${tab === "media" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
                value="media"
                style={{ backgroundColor: "transparent", color: "white" }}
              >
                Media
              </TabsTrigger>
            </TabsList>
            <TabsContent value="company" className="mt-[250px]">
              <CompanyContainer />
            </TabsContent>
            <TabsContent value="trust" className="mt-[200px]">
              <TrustContainer />
            </TabsContent>
            <TabsContent className="mt-[320px]" value="media">
              <MediaContainer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default memo(AboutUsContainer);
