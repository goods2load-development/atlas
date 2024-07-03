"use client";
import { type FC, memo, useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import MediaContainer from "@/app/_components/MediaContainer/MediaContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrustContainer from "@/app/_components/Trust/TrustContainer/TrustContainer";
import CompanyContainer from "@/app/_components/Company/CompanyContainer/CompanyContainer";

const AboutUs: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabs = ["Company", "Trust", "Media"];
  const thisTab =
    searchParams.toString().replace("=", "") || tabs[0].toLowerCase();

  const [activeTab, setActiveTab] = useState(thisTab);

  useEffect(() => {
    thisTab !== activeTab && setActiveTab(thisTab);
  }, [thisTab]);

  const onTabChange = (value: string) => {
    router.push(`/about-us?${value}`);
    setActiveTab(value);
  };

  return (
    <div className="flex relative flex-col w-full items-center justify-center bg-cover bg-center text-white text-center sm:mt-[-75px]">
      <div className="flex flex-col w-full items-center justify-center sm:pt-[47px] pt-10 sm:bg-hero-pattern bg-cover bg-center text-white text-center sm:pb-[240px] md:pb-[230px] pb-[170px] realtive">
        <h1 className="text-[38px]/[42px] sm:text-[64px] sm:leading-[70px] font-light mb-2 sm:pt-[120px]">
          About <span className="italic font-normal">us</span>
        </h1>
        <h2 className="sm:mb-[68px] text-[17px]/[25px] font-light max-w-[323px] sm:max-w-[100%]">
          We help reduce costs, increase efficiency and offer improved customer
          service
        </h2>
        <div className="sm:hidden absolute w-full h-[337px] bg-primaryOrange bg-hero-pattern-mobile bg-cover -z-10"></div>
      </div>

      <div className="flex sm:mt-[-300px] mt-[-120px]">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="flex gap-8 sm:gap-32 md:gap-40 lg:gap-52 sm:mt-20">
            {tabs.map((tabText) => (
              <TabsTrigger
                key={tabText}
                className={`max-w-[260px] text-center italic text-[20px]/[24px] sm:text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${activeTab === tabText.toLowerCase() ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
                value={tabText.toLowerCase()}
                style={{ backgroundColor: "transparent", color: "white" }}
              >
                {tabText}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="bg-gradient-to-b from-primaryOrange to-white relative top-[15px] h-[50px] sm:hidden"></div>
          <TabsContent value="company" className="sm:mt-[250px]">
            <CompanyContainer />
          </TabsContent>
          <TabsContent value="trust" className="sm:mt-[200px]">
            <TrustContainer />
          </TabsContent>
          <TabsContent className="mt-[80px] sm:mt-[240px]" value="media">
            <MediaContainer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default memo(AboutUs);
