"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questionsContent = [
  {
    number: "01",
    title: "HOW DOES GOODS2LOAD WORK?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Elit pulvinar in neque enim nunc donec justo. Commodo tincidunt in et sit diam odio at. At varius suspendisse erat quam suscipit. Neque dui mollis morbi fermentum nulla nisl. Egestas proin est urna purus morbi potenti. Enim lacinia in justo eu vivamus turpis duis.",
  },
  {
    number: "02",
    title: "HOW CAN I FIND THE CHEAPEST LOGISTIC SOLUTION WITH GOODS2LOAD?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Elit pulvinar in neque enim nunc donec justo. Commodo tincidunt in et sit diam odio at. At varius suspendisse erat quam suscipit. Neque dui mollis morbi fermentum nulla nisl. Egestas proin est urna purus morbi potenti. Enim lacinia in justo eu vivamus turpis duis.",
  },
  {
    number: "03",
    title: "DO I BOOK MY LOGISTIC SERVICE WITH GOODS2LOAD?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Elit pulvinar in neque enim nunc donec justo. Commodo tincidunt in et sit diam odio at. At varius suspendisse erat quam suscipit. Neque dui mollis morbi fermentum nulla nisl. Egestas proin est urna purus morbi potenti. Enim lacinia in justo eu vivamus turpis duis.",
  },
  {
    number: "04",
    title: "WHAT HAPPEN AFTER I BOOK MY LOGISTIC SERVICES?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Elit pulvinar in neque enim nunc donec justo. Commodo tincidunt in et sit diam odio at. At varius suspendisse erat quam suscipit. Neque dui mollis morbi fermentum nulla nisl. Egestas proin est urna purus morbi potenti. Enim lacinia in justo eu vivamus turpis duis.",
  },
  {
    number: "05",
    title: "CAN I BOOK A LOGISTIC SERVICE THAT EMIT LESS CO2?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Elit pulvinar in neque enim nunc donec justo. Commodo tincidunt in et sit diam odio at. At varius suspendisse erat quam suscipit. Neque dui mollis morbi fermentum nulla nisl. Egestas proin est urna purus morbi potenti. Enim lacinia in justo eu vivamus turpis duis.",
  },
  {
    number: "06",
    title: "WHAT IS A PRICE ALLERT?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Elit pulvinar in neque enim nunc donec justo. Commodo tincidunt in et sit diam odio at. At varius suspendisse erat quam suscipit. Neque dui mollis morbi fermentum nulla nisl. Egestas proin est urna purus morbi potenti. Enim lacinia in justo eu vivamus turpis duis.",
  },
];

function QuestionItem(props: any) {
  return (
    <AccordionItem value={`item-${props.number}`} className="py-4">
      <AccordionTrigger className="text-orangePrimary hover:no-underline">
        <div className="text-[18px]/[28px] font-normal text-left">
          <i className="text-[24px]/[28px] inline-block w-20 pr-10">
            {props.number}
          </i>
          <span className="text-black">{props.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-20 text-[18px]/[24px] font-light">
        {props.content}
      </AccordionContent>
    </AccordionItem>
  );
}

export default function QuestionsAndAnswers() {
  return (
    <div className="px-16 py-24 flex flex-col bg-bgQuestions bg-cover bg-center">
      <div className="text-center text-[48px]/[48px] mb-12">
        <i className="bg-orangeSecondary px-[5px]">Answers</i>
        <span>to Your Burning</span>
        <i className="bg-orangeSecondary px-[5px]">Questions</i>
      </div>
      <Accordion type="single" collapsible className="w-8/12 self-center">
        {questionsContent.map((item) => (
          <QuestionItem {...item} key={item.number} />
        ))}
      </Accordion>
    </div>
  );
}
