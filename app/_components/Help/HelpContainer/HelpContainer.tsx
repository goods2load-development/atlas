import React from "react";
import HelpAccordion from "../HelpAccordion/HelpAccordion";
import { TabName } from "@/app/interface/helpData";

interface HelpContainer {
  answearCondition: TabName;
}

const HelpContainer: React.FC<HelpContainer> = ({ answearCondition }) => {
  return (
    <div className="w-full relative inset-0 flex flex-col items-center mt-80px bg-bgQuestions bg-center bg-100% bg-no-repeat">
      <HelpAccordion curAnswearCondition={answearCondition} />
    </div>
  );
};

export default HelpContainer;
