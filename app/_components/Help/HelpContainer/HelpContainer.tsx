import React from "react";
import Image from "next/image";

import HelpAccordion from "../HelpAccordion/HelpAccordion";

import mainDecore from "@/assets/HelpImage/decore1.png";

import secondDecore from "@/assets/HelpImage/decore2.png";

interface HelpContainer {
  answearCondition: string;
}

const HelpContainer: React.FC<HelpContainer> = ({ answearCondition }) => {
  return (
    <div className="w-full inset-0 flex flex-col items-center mt-80px">
      <div className="w-full relative top-[700px] inset-0 flex flex-col items-center mt-80px">
        <div className="absolute left-0 bottom-[-100px]">
          <Image src={mainDecore} alt="decore-1"></Image>
        </div>
        <div className="absolute right-0 bottom-[200px]">
          <Image src={secondDecore} alt="decore-2"></Image>
        </div>
      </div>
      <HelpAccordion curAnswearCondition={answearCondition} />
    </div>
  );
};

export default HelpContainer;
