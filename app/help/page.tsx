"use client";
import { type FC, memo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import HelpShipSvg from "@/components/ui/Svg/HelpSvg/HelpShipSvg";
import HelpPlaneSvg from "@/components/ui/Svg/HelpSvg/HelpPlaneSvg";
import HelpTruckSvg from "@/components/ui/Svg/HelpSvg/HelpTruckSvg";

import HelpContainer from "../_components/Help/HelpContainer/HelpContainer";

const AboutUsContainer: FC = () => {
  const [currentTabValue, setCurrentTabValue] = useState("plane");

  const onTabChange = (value: string) => {
    setCurrentTabValue(value);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center pt-[47px] bg-hero-pattern bg-cover bg-center text-white text-center ">
      <h1 className="text-[64px] leading-[70px] font-light mb-2 pt-[120px]">
        How can we <span className="italic">help</span>{" "}
        <span className="italic">you</span> <span className="italic">?</span>
      </h1>
      <h2 className="mb-[68px] text-[17px]/[28px] font-light font-[300px] leading-[28px]">
        Doing business is never been so easy.
      </h2>
      <div className="flex w-fit pb-[190px]">
        <Tabs value={currentTabValue} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger
              className={`relative w-[260px] text-center italic bg-black text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentTabValue === "plane" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
              value="plane"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              Plane
              <div className="absolute left-3">
                <HelpPlaneSvg />
              </div>
            </TabsTrigger>
            <TabsTrigger
              className={`relative w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentTabValue === "ship" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
              value="ship"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              Ship
              <div className="absolute left-3">
                <HelpShipSvg />
              </div>
            </TabsTrigger>

            <TabsTrigger
              className={`relative w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentTabValue === "truck" ? "decorative-link text-white-500 hover:text-white-700" : "font-normal"}`}
              value="truck"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              Truck
              <div className="absolute left-3">
                <HelpTruckSvg />
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="plane">
            <HelpContainer answearCondition={currentTabValue} />
          </TabsContent>
          <TabsContent value="ship">
            <HelpContainer answearCondition={currentTabValue} />
          </TabsContent>
          <TabsContent value="truck">
            <HelpContainer answearCondition={currentTabValue} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default memo(AboutUsContainer);
