import { helpData } from '../helpData';
import { TabName } from '@/app/interface/helpData';
import { AccordionTrigger } from '@radix-ui/react-accordion';

import React, { Fragment, useState } from 'react';

import HelpArrowAccordionSvg from '@/components/ui/Svg/HelpSvg/HelpArrowAccordionSvg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';

interface HelpAccordion {
  curAnswearCondition: TabName;
}

const HelpAccordion: React.FC<HelpAccordion> = ({ curAnswearCondition }) => {
  const [currentHelpData, setcurrentHelpData] = useState(
    helpData[curAnswearCondition].map((prev) => ({ ...prev, open: false })),
  );

  return (
    <div className="w-full pb-[104px] px-4  max-w-[990px] flex flex-col justify-center items-center sm:mt-52 mt-40">
      <div className="w-full flex justify-center items-center flex-col">
        <div className="text-center text-black text-[34px]/[38px] sm:text-[48px]/[76px] mb-[40px]">
          <i className="bg-allTittleColor px-2 rounded-md">Answers</i>
          <span> to Your Burning </span>
          <i className="bg-allTittleColor px-2 rounded-md">Questions</i>
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
                            i === index ? { ...it, open: !it.open } : it,
                          ),
                        )
                      }
                    >
                      <div className="sm:text-[18px]/[28px] font-normal flex relative items-center">
                        <i className="text-[20px]/[24px] sm:text-[24px]/[28px] font-light sm:font-normal pr-4 pb-8 sm:pr-[40px] sm:pb-[30px] sm:p-0">
                          0{index + 1}
                        </i>
                        <span className="text-black text-left pb-6 sm:pb-[30px] pr-5 max-w-[85%]">
                          {question.toUpperCase()}
                          <div
                            className={`absolute right-8 sm:right-[50px] top-2 transform translate-x-[30px] transition duration-300 ${open ? '-scale-y-100' : ''}`}
                          >
                            <HelpArrowAccordionSvg />
                          </div>
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-left sm:pl-[60px] pl-8 text-[15px]/[22px] font-light sm:text-[16px]/[24px]">
                      {description}
                    </AccordionContent>
                  </AccordionItem>
                </Fragment>
              );
            },
          )}
        </Accordion>
      </div>
    </div>
  );
};
export default HelpAccordion;
