"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function QuestionsAndAnswers() {
  return (
    <div className="px-16 py-10 flex flex-col bg-bgQuestions bg-cover bg-center">
      <div className="text-center text-[48px]/[48px] mb-[20px]">
        <i className="bg-orangeSecondary px-[5px]">Answers</i>
        <span>to Your Burning</span>
        <i className="bg-orangeSecondary px-[5px]">Questions</i>
      </div>
      <Accordion type="single" collapsible className="w-8/12 self-center">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-orangePrimary">
            <div className="text-[18px]/[28px] font-normal">
              <i className="text-[24px]/[28px] pr-[40px]">01</i>
              <span className="text-black">HOW DOES GOODS2LOAD WORK?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>content needed</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-orangePrimary">
            <div className="text-[18px]/[28px] font-normal">
              <i className="text-[24px]/[28px] pr-[40px]">02</i>
              <span className="text-black">
                HOW CAN I FIND THE CHEAPEST LOGISTIC SOLUTION WITH GOODS2LOAD?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>content needed</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-orangePrimary">
            <div className="text-[18px]/[28px] font-normal">
              <i className="text-[24px]/[28px] pr-[40px]">03</i>
              <span className="text-black">
                DO I BOOK MY LOGISTIC SERVICE WITH GOODS2LOAD?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>content needed</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-orangePrimary">
            <div className="text-[18px]/[28px] font-normal">
              <i className="text-[24px]/[28px] pr-[40px]">04</i>
              <span className="text-black">
                WHAT HAPPEN AFTER I BOOK MY LOGISTIC SERVICES?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>content needed</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-orangePrimary">
            <div className="text-[18px]/[28px] font-normal">
              <i className="text-[24px]/[28px] pr-[40px]">05</i>
              <span className="text-black">
                CAN I BOOK A LOGISTIC SERVICE THAT EMIT LESS CO2?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>content needed</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-orangePrimary">
            <div className="text-[18px]/[28px] font-normal">
              <i className="text-[24px]/[28px] pr-[40px]">06</i>
              <span className="text-black">WHAT IS A PRICE ALLERT?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>content needed</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
