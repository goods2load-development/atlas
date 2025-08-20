'use client';

import FaqBg1 from '@/assets/images/faqmobile1.png';
import FaqBg2 from '@/assets/images/faqmobile2.png';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function QuestionItem(props: any) {
  return (
    <AccordionItem value={`item-${props.number}`} className="sm:py-4">
      <AccordionTrigger className="text-orangePrimary font-light hover:no-underline md:ml-4 ml-0">
        <div className="text-[18px]/[22px] font-normal text-left uppercase">
          <i className="text-[20px]/[24px] font-light sm:text-[24px]/[28px] inline-block w-8 sm:w-20 pr-10">
            {props.number}
          </i>
          <h3 className="text-blackTertiary inline">{props.title}</h3>
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
        'px-5 sm:px-16 sm:py-24 py-12 flex flex-col bg-top bg-100% bg-no-repeat relative min-h-[700px]',
        isBackground ? 'md:bg-bgQuestions' : null,
      )}
    >
      <Image
        src={FaqBg1}
        width={167}
        height={312}
        className="absolute left-0 bottom-0 md:hidden"
        alt="faqmobile1"
      />
      <Image
        src={FaqBg2}
        width={158}
        height={302}
        className="absolute top-0 right-0 md:hidden"
        alt="faqmobile2"
      />
      <h2 className="text-center text-[34px] sm:text-[48px] mb-4 md:mb-6 italic">
        Still Have
        <i className="bg-allTittleColor px-2 ml-2 rounded-md font-medium inline-block">
          Questions?
        </i>
      </h2>
      <p className="text-[22px] mb-6 font-light max-w-[884px] w-full self-center">
        Check our <strong>FAQs</strong> to learn:
      </p>
      <Accordion
        type="single"
        collapsible
        className="max-w-[884px] w-full self-center z-20"
      >
        {data?.map((item) => <QuestionItem {...item} key={item.number} />)}
      </Accordion>
    </section>
  );
}
