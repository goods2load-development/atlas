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
    content: (
      <span>
        Goods2Load is a platform designed to connect logistics companies with
        small and medium-sized enterprises, facilitating the transportation of
        goods. Here&apos;s how it works:
        <br />
        <ol>
          <li>
            &#x2022;Registration: Small and medium-sized enterprises register on
            the Goods2Load platform, providing necessary information about their
            business and transportation needs.
            <br />
            <br />
          </li>
          <li>
            &#x2022;Load Posting: Companies input details of their loads,
            including pickup and delivery locations, type of cargo, and other
            relevant information.
          </li>
          <li>
            &#x2022;Load Search: Small and medium-sized enterprises can browse
            available loads on the platform, provided by Goods2Load&apos;s
            logistics partner companies. They can filter results based on
            criteria such as pickup location, destination, type of cargo, speed,
            cost, and CO2 emissions.
            <br />
            <br />
          </li>
          <li>
            &#x2022;Negotiation: Small and medium-sized enterprises are
            redirected to the platform or original contact to negotiate terms
            such as price, delivery timeline, and other details.
            <br />
            <br />
          </li>
          <li>
            &#x2022;Contracting: Once terms are agreed upon, companies finalize
            the contract through their official platform.
            <br />
            <br />
          </li>
        </ol>
      </span>
    ),
  },
  {
    number: "02",
    title: "HOW CAN I FIND THE CHEAPEST LOGISTIC SOLUTION WITH GOODS2LOAD?",
    content:
      "By entering specific details such as pickup and delivery locations, cargo type, preferred delivery timeline, and budget constraints, and utilizing all the filters available on our platform, you'll be able to uncover the most suitable and cost-effective logistic solutions tailored to your requirements.",
  },
  {
    number: "03",
    title: "DO I BOOK MY LOGISTIC SERVICE WITH GOODS2LOAD?",
    content:
      "You won't be booking your logistic service directly on Goods2Load, nor will you make payments for your logistic service through our platform. However, you will retain the best offer negotiated for you by us, and seamlessly continue the process on the logistic provider's platform to finalize and define the service according to your requirements.",
  },
  {
    number: "04",
    title: "WHAT HAPPEN AFTER I BOOK MY LOGISTIC SERVICES?",
    content:
      "After agreeing on the price, you will proceed to make the payment. Following this, you'll receive a confirmation of your booking from your chosen logistic provider. They will then initiate the logistics process, which could include picking up your goods, transporting them to the designated destination, and delivering them as per the agreed-upon terms. Throughout this process, you can monitor the progress of your shipment using the provided tracking information.",
  },
  {
    number: "05",
    title: "CAN I BOOK A LOGISTIC SERVICE THAT EMIT LESS CO2?",
    content:
      "Yes, many logistic service providers offer eco-friendly options that emit less CO2. When booking a logistic service through Goods2Load, you can use filters to search for environmentally friendly options. Look for providers that offer green or sustainable logistics solutions, such as those using electric or hybrid vehicles, optimizing routes for efficiency. Additionally, some providers may offer carbon offset programs to mitigate the environmental impact of shipping. Double-check how much carbon emissions you have saved and receive your GREENCOIN reward, facilitating purchases of more and more green services to help preserve the planet!",
  },
  {
    number: "06",
    title: "WHAT IS A PRICE ALLERT?",
    content:
      "A 'price alert' is a feature that allows our users to set notifications for specific route or offer or both. When the price of the selected service reaches the designated level, the user receives an alert via email, SMS, or through the platform itself. Price alerts are useful for consumers and investors who want to track price movements and make informed decisions about purchasing or selling goods.",
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
    <div className="px-16 py-24 flex flex-col bg-bgQuestions bg-top bg-100% bg-no-repeat">
      <div className="text-center text-[48px]/[48px] mb-12 font-light">
        <i className="bg-orangeSecondary px-2 rounded-sm font-normal">
          Answers
        </i>{" "}
        <span>to Your Burning</span>{" "}
        <i className="bg-orangeSecondary px-2 rounded-sm font-normal">
          Questions
        </i>
      </div>
      <Accordion type="single" collapsible className="w-8/12 self-center">
        {questionsContent.map((item) => (
          <QuestionItem {...item} key={item.number} />
        ))}
      </Accordion>
    </div>
  );
}
