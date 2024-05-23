"use client";
import HelpContainer from "@/app/_components/Help/HelpContainer/HelpContainer";
import { tabs } from "@/app/_components/Help/helpData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Help() {
  const router = useRouter();
  const tabParam = useSearchParams().toString().split("=")[0];
  const tabName = `${tabParam[0]?.toUpperCase()}${tabParam.slice(1, tabParam.length)}`;
  const tabFromDataByParam = tabs.find(({ name }) => name === tabName);
  const initTab = tabFromDataByParam || tabs[0];
  const [currentTab, setCurrentTab] = useState(initTab);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center pt-[47px] bg-hero-pattern bg-cover bg-center text-white text-center mt-[-75px]">
        <h1 className="text-[64px] leading-[70px] font-light mb-2 pt-[120px]">
          How can we <span className="italic">help</span>
          <span className="italic"> you</span>
          <span className="italic">?</span>
        </h1>
        <h2 className="mb-[68px] text-[17px]/[28px] font-light leading-[28px]">
          Doing business is never been so easy.
        </h2>
        <div className="flex w-fit pb-[190px]"></div>
      </div>
      <Tabs
        value={currentTab.name}
        className="mt-[-200px] w-full"
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
              className={`relative w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] hover:cursor-pointer ${currentTab.name === name ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
            >
              {name}
              <div className="absolute left-3">{icon}</div>
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
