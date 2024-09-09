"use client";
import HelpContainer from "@/app/_components/Help/HelpContainer/HelpContainer";
import { tabs } from "@/app/_components/Help/helpData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Help() {
  const router = useRouter();
  const tabParam = useSearchParams().toString().split("=")[0];
  const tabFromDataByParam = tabs.find(({ name }) => name === tabParam);
  const initTab = tabFromDataByParam || tabs[0];
  const [currentTab, setCurrentTab] = useState(initTab);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center sm:pt-[47px] bg-orangePrimary sm:bg-transparent bg-partners-mobile sm:bg-hero-pattern bg-cover bg-top sm:bg-center text-white text-center mt-[-75px]">
        <h1 className="text-[38px]/[42px] sm:text-[64px] sm:leading-[70px] font-light mb-4 sm:mb-2 sm:pt-[120px] pt-28">
          How can we <span className="italic">help</span>
          <span className="italic"> you</span>
          <span className="italic">?</span>
        </h1>
        <h2 className="sm:mb-[68px] text-[17px]/[28px] font-light leading-[28px]">
          Doing business has never been easier.{" "}
        </h2>
        <div className="flex w-fit sm:pb-[190px] pb-[130px]"></div>
      </div>
      <div className="w-full bg-gradient-to-b from-primaryOrange to-white relative h-[50px] sm:hidden "></div>
      <Tabs
        value={currentTab.name}
        className="mt-[-130px] sm:mt-[-200px] w-full"
        onValueChange={(e) => {
          const newTab = tabs.find(({ name }) => name === e);
          newTab && setCurrentTab(newTab);
          router.push(`/help?${e.toLowerCase()}`);
        }}
      >
        <TabsList className="flex justify-center mt-54">
          {tabs.map(({ name, icon }) => (
            <TabsTrigger
              key={name}
              value={name}
              style={{ backgroundColor: "transparent", color: "white" }}
              className={`flex items-center w-[260px] text-center italic capitalize text-[18px]/[22px] sm:text-[24px]/[31px] font-light h-[57px] hover:cursor-pointer ${currentTab.name === name ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
            >
              <img
                src={icon}
                className="w-[28px] min-w-[28px] h-[28px] min-h-[28px] sm:w-[40px] sm:min-w-[40px] sm:h-[40px] sm:min-h-[40px] mr-[8px] sm:mr-[16px]"
                alt={"icon"}
              />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(({ name }) => (
          <TabsContent key={name} value={name}>
            <HelpContainer answearCondition={currentTab.name} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
