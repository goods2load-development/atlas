import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { AccordionTrigger } from "@radix-ui/react-accordion";

import { helpData } from "../helpData";

import HelpArrowAccordionSvg from "@/components/ui/Svg/HelpSvg/HelpArrowAccordionSvg";

interface HelpAccordion {
  curAnswearCondition: string;
}

const HelpAccordion: React.FC<HelpAccordion> = ({ curAnswearCondition }) => {
  const [currentHelpData, setcurrentHelpData] = useState(
    helpData[curAnswearCondition]
  );

  function addToggleTrigger(index: number) {
    setcurrentHelpData((cur) =>
      cur.map(
        (
          it: { question: string; description: string; open: boolean },
          i: number
        ) => (i === index ? { ...it, open: !it.open } : it)
      )
    );
  }

  return (
    <div className="w-full px-16 py-10 flex flex-col  flex justify-center items-center mt-52">
      <div className="w-full max-w-[1440px] flex justify-center items-center flex-col">
        <div className="text-center text-black text-[48px]/[48px] mb-[40px]">
          <i className="bg-allTittleColor px-[5px]">Answers</i>
          <span>to Your Burning</span>
          <i className="bg-allTittleColor px-[5px]">Questions</i>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-8/12 self-center flex flex-col justify-center"
        >
          {currentHelpData.map(({ question, description, open }, i: number) => {
            return (
              <>
                {" "}
                {i === 0 ? <div className="w-full border-b"></div> : null}
                <AccordionItem
                  key={i}
                  value={String(i)}
                  className="w-full relative pt-[30px] "
                >
                  <AccordionTrigger
                    className="text-orangePrimary w-full"
                    onClick={() => addToggleTrigger(i)}
                  >
                    <div className="text-[18px]/[28px] font-normal flex relative">
                      <i className="text-[24px]/[28px] pr-[40px]">0{i + 1}</i>
                      <span className="text-black text-left max-w-[644px] mb-[30px]">
                        {question.toUpperCase()}
                        <div
                          className={`absolute right-[50px] top-2  transform translate-x-[30px] ${open ? "rotate-180" : ""}`}
                        >
                          <HelpArrowAccordionSvg />
                        </div>
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-black text-left max-w-[633px] pl-[60px]">
                    {description}
                  </AccordionContent>
                </AccordionItem>
              </>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
export default HelpAccordion;
