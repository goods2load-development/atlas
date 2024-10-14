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
    <div className="sm:mt-[-300px] mt-[-120px] w-full">
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
  );
};

export default memo(AboutUs);
