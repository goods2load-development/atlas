import React, { Fragment, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { AccordionTrigger } from "@radix-ui/react-accordion";

import { helpData } from "../helpData";

import HelpArrowAccordionSvg from "@/components/ui/Svg/HelpSvg/HelpArrowAccordionSvg";
import { TabName } from "@/app/interface/helpData";

interface HelpAccordion {
  curAnswearCondition: TabName;
}

const HelpAccordion: React.FC<HelpAccordion> = ({ curAnswearCondition }) => {
  const [currentHelpData, setcurrentHelpData] = useState(
    helpData[curAnswearCondition].map((prev) => ({ ...prev, open: false }))
  );

  return (
    <div className="w-full py-10 pb-[104px] px-[278px] flex flex-col justify-center items-center mt-52">
      <div className="w-full max-w-[1440px] flex justify-center items-center flex-col">
        <div className="text-center text-black text-[48px]/[76px] mb-[40px]">
          <i className="bg-allTittleColor px-[5px]">Answers</i>
          <span> to Your Burning </span>
          <i className="bg-allTittleColor px-[5px]">Questions</i>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full self-center flex flex-col justify-center"
        >
          {currentHelpData.map(
            ({ question, description, open }, index: number) => {
              return (
                <Fragment key={index}>
                  {index === 0 && <div className="w-full border-b" />}
                  <AccordionItem
                    value={String(index)}
                    className="w-full relative pt-[30px] "
                  >
                    <AccordionTrigger
                      className="text-orangePrimary w-full"
                      onClick={() =>
                        setcurrentHelpData((cur) =>
                          cur.map((it, i: number) =>
                            i === index ? { ...it, open: !it.open } : it
                          )
                        )
                      }
                    >
                      <div className="text-[18px]/[28px] font-normal flex relative">
                        <i className="text-[24px]/[28px] pr-[40px]">
                          0{index + 1}
                        </i>
                        <span className="text-black text-left mb-[30px]">
                          {question.toUpperCase()}
                          <div
                            className={`absolute right-[50px] top-2 transform translate-x-[30px] transition duration-300 ${open ? "-scale-y-100" : ""}`}
                          >
                            <HelpArrowAccordionSvg />
                          </div>
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-left pl-[60px]">
                      {description}
                    </AccordionContent>
                  </AccordionItem>
                </Fragment>
              );
            }
          )}
        </Accordion>
      </div>
    </div>
  );
};
export default HelpAccordion;
