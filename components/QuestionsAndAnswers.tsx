"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";

function QuestionItem(props: any) {
  return (
    <AccordionItem value={`item-${props.number}`} className="sm:py-4">
      <AccordionTrigger className="text-orangePrimary font-light hover:no-underline md:ml-4 ml-0">
        <div className="text-[18px]/[22px] font-normal text-left">
          <i className="text-[20px]/[24px] font-light sm:text-[24px]/[28px] inline-block w-8 sm:w-20 pr-10">
            {props.number}
          </i>
          <span className="text-blackTertiary">{props.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-5 sm:pl-20 text-[16px]/[24px] font-light max-w-[760px] text-blackTertiary">
        {props.content}
      </AccordionContent>
    </AccordionItem>
  );
}

export default function QuestionsAndAnswers({
  isBackground = true,
  data,
}: {
  isBackground?: boolean;
  data: {
    title: string;
    number: string;
    content: string | React.ReactNode;
  }[];
}) {
  return (
    <section
      className={clsx(
        "px-5 sm:px-16 sm:py-24 py-12 flex flex-col bg-top bg-100% bg-no-repeat relative",
        isBackground ? "md:bg-bgQuestions" : null
      )}
    >
      <img
        src="/faqmobile1.png"
        className="absolute left-0 bottom-0 md:hidden"
        alt={"faqmobile1"}
      />
      <img
        src="/faqmobile2.png"
        className="absolute top-0 right-0 md:hidden"
        alt={"faqmobile2"}
      />
      <div className="text-center text-[34px] sm:text-[48px] mb-12 font-light">
        <i className="bg-allTittleColor px-2 rounded-md font-normal">Answers</i>
        <span> to Your Burning </span>
        <i className="bg-allTittleColor px-2 rounded-md font-normal">
          Questions
        </i>
      </div>
      <Accordion
        type="single"
        collapsible
        className="max-w-[884px] w-full self-center"
      >
        {data?.map((item) => <QuestionItem {...item} key={item.number} />)}
      </Accordion>
    </section>
  );
}
