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
      <div className="flex flex-col w-full items-center justify-center pt-[47px] bg-hero-pattern bg-cover bg-center text-white text-center pb-[300px]">
        <h1 className="text-[38px]/[42px] sm:text-[64px] sm:leading-[70px] font-light mb-2 pt-[120px]">
          About <span className="italic font-normal">us</span>
        </h1>
        <h2 className="mb-[68px] text-[17px]/[28px] font-light">
          We help reduce costs, increase efficiency and offer improved customer
          service
        </h2>
      </div>

      <div className="flex mt-[-250px]">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
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
  );
};

export default memo(AboutUs);
