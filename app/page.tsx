import React from 'react';

import { Metadata } from 'next';

import Analytics from '@/components/Dashboard/Analytics';
import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import MainImageLayout from '@/components/MainLayout';
import QuestionsAndAnswers from '@/components/QuestionsAndAnswers';
import SearchMain from '@/components/SearchMain';
import SliderMain from '@/components/SliderMain';
import SubHeaderMain from '@/components/SubHeaderMain';
import TailoredServices from '@/components/TailoredServices';
import ConsentPopup from '@/components/common/ConsentPopup';
import GDPRAiPopup from '@/components/common/GDPRAiPopup';

const title = 'Top Logistics Company in Dubai | Best Cargo Services UAE';
const description =
  'Discover the best cargo and logistics companies in Dubai and the UAE. Our top-rated services ensure efficient and reliable solutions for all your shipping needs.';
const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
  },
  twitter: {
    title,
    description,
  },
};

const questionsContent = [
  {
    number: '01',
    title: 'HOW DOES GOODS2LOAD WORK?',
    content: (
      <span>
        Goods2Load is a platform designed to connect logistics companies with
        small and medium-sized enterprises, facilitating the transportation of
        goods. Here&apos;s how it works:
        <br />
        <ol>
          <li>
            &#x2022; Registration: Small and medium-sized enterprises register
            on the Goods2Load platform, providing necessary information about
            their business and transportation needs.
            <br />
            <br />
          </li>
          <li>
            &#x2022; Load Posting: Companies input details of their loads,
            including pickup and delivery locations, type of cargo, and other
            relevant information.
            <br />
            <br />
          </li>
          <li>
            &#x2022; Load Search: Small and medium-sized enterprises can browse
            available loads on the platform, provided by Goods2Load&apos;s
            logistics partner companies. They can filter results based on
            criteria such as pickup location, destination, type of cargo, speed,
            cost, and CO2 emissions.
            <br />
            <br />
          </li>
          <li>
            &#x2022; Negotiation: Small and medium-sized enterprises are
            redirected to the platform or original contact to negotiate terms
            such as price, delivery timeline, and other details.
            <br />
            <br />
          </li>
          <li>
            &#x2022; Contracting: Once terms are agreed upon, companies finalize
            the contract through their official platform.
            <br />
            <br />
          </li>
        </ol>
      </span>
    ),
  },
  {
    number: '02',
    title: 'DO I BOOK MY LOGISTIC SERVICE WITH GOODS2LOAD?',
    content:
      "You won't be booking your logistic service directly on Goods2Load, nor will you make payments for your logistic service through our platform. However, you will retain the best offer negotiated for you by us, and seamlessly continue the process on the logistic provider's platform to finalize and define the service according to your requirements.",
  },
  {
    number: '03',
    title: 'WHAT HAPPEN AFTER I BOOK MY LOGISTIC SERVICES?',
    content:
      "After agreeing on the price, you will proceed to make the payment. Following this, you'll receive a confirmation of your booking from your chosen logistic provider. They will then initiate the logistics process, which could include picking up your goods, transporting them to the designated destination, and delivering them as per the agreed-upon terms. Throughout this process, you can monitor the progress of your shipment using the provided tracking information.",
  },
  {
    number: '04',
    title: 'CAN I BOOK A LOGISTIC SERVICE THAT EMIT LESS CO2?',
    content:
      'Yes, many logistic service providers offer eco-friendly options that emit less CO2. When booking a logistic service through Goods2Load, you can use filters to search for environmentally friendly options. Look for providers that offer green or sustainable logistics solutions, such as those using electric or hybrid vehicles, optimizing routes for efficiency. Additionally, some providers may offer carbon offset programs to mitigate the environmental impact of shipping. Double-check how much carbon emissions you have saved and receive your GREENCOIN reward, facilitating purchases of more and more green services to help preserve the planet!',
  },
  {
    number: '05',
    title: "WHAT IS 'SOLUTION FINDER?'",
    content:
      "'SOLUTION FINDER' is a feature that allows our users to set notifications for specific route or offer or both. When the SOLUTION of the selected service reaches the designated level, the user receives an alert via email, SMS, or through the platform itself. Solutions Finder are useful for consumers and investors who want to track price movements and make informed decisions about purchasing or selling goods.",
  },
];

export default function Home() {
  return (
    <>
      <MainImageLayout>
        <HeaderClient variant="transparent" />
        <DynamicMenu variant="transparent" />
        <div className="px-[16px] max-w-[1328px] mx-auto">
          <h1 className="pt-[32px] sm:pt-16 pb-5 text-[38px]/[42px] sm:text-[64px]/[68px] font-light max-w-[1265px] text-center sm:text-left">
            Unlock countless <i className="font-normal">high-quality</i>{' '}
            shipping options with <i className="font-normal">just one click</i>
          </h1>
          <span className="font-light text-[16px]/[20px] sm:text-[24px]/[28px] text-center block sm:text-left">
            Doing business has never been easier.
          </span>
        </div>
      </MainImageLayout>
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main max-w-full">
        <div className="mt-[-170px] sm:mt-[-120px] mb-20 w-full px-[16px] max-w-[1328px] mx-auto">
          <SearchMain main />
        </div>
        <SubHeaderMain />
        <TailoredServices className="py-20 md:py-[104px]" />
        <SliderMain />
        <QuestionsAndAnswers data={questionsContent} />
        <Analytics />
      </main>
      <Footer />
      <GDPRAiPopup />
      <ConsentPopup />
    </>
  );
}
