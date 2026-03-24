import PartnersOurPartners from '@/app/_components/Partners/PartnersOurPartners/PartnersOurPartners';
import Icon1 from '@/assets/images/WhyChooseUs/1.svg';
import Icon2 from '@/assets/images/WhyChooseUs/3.svg';
import { generateDefaultMetadata } from '@/lib/metadataUtils';

import React from 'react';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import HeaderClient from '@/components/Header/HeaderClient';
import MainImageLayout from '@/components/MainLayout';
import SearchMain from '@/components/SearchMain';
import SubHeaderMain from '@/components/SubHeaderMain';
import TailoredServices from '@/components/TailoredServices';

const ConsentPopup = dynamic(() => import('@/components/common/ConsentPopup'), {
  ssr: false,
});

const DigitalAlliances = dynamic(
  () => import('@/app/_components/Alliances/DigitalAliances'),
);

const ExpandYourReach = dynamic(
  () => import('@/app/_components/ExpandYourReach/ExpandYourReach'),
);

const WhyChooseG2L = dynamic(
  () => import('@/app/_components/WhyChooseG2L/WhyChoose'),
);

const QuestionsAndAnswers = dynamic(
  () => import('@/components/QuestionsAndAnswers'),
);

const DynamicMenu = dynamic(() => import('@/components/Header/DynamicMenu'));

const SliderMain = dynamic(() => import('@/components/SliderMain'));

const title = 'Find Trusted Freight Partners - or Grow as One';
const description =
  'Discover how Goods2Load connects businesses with verified freight forwarders in the UAE and worldwide, without middlemen cost.';

export function generateMetadata(): Metadata {
  const defaultMetadata = generateDefaultMetadata();
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || 'https://goods2load.com';
  const canonical = `${baseUrl}/`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: canonical,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
}

const questionsContent = [
  {
    number: '01',
    title: 'HOW DOES GOODS2LOAD WORK?',
    content: (
      <span>
        Goods2Load is a digital platform that connects logistics providers with
        small and medium-sized enterprises (SMEs), making it easier to find
        reliable freight solutions tailored to their specific needs. Here&#39;s
        how the platform works:
        <br />
        <br />
        <ol>
          <li>
            &#x2022; <strong>Registration</strong>: Logistics providers and SMEs
            register on the platform by creating a profile and selecting a plan
            that fits their business type and needs.
            <br />
            <br />
          </li>
          <li>
            &#x2022; <strong>Service Browsing</strong>: SMEs can browse
            logistics providers listed on the platform, using filters such as
            freight type (air, sea, road), origin and destination,
            certifications, service speed, and CO2 offset availability.
            <br />
            <br />
          </li>
          <li>
            &#x2022; <strong>Direct Contact</strong>: Once a suitable provider
            is identified, SMEs can reach out directly to the logistics company
            through their contact details listed on the platform—there is no
            price comparison or negotiation through Goods2Load.
            <br />
            <br />
          </li>
          <li>
            &#x2022; <strong>External Agreement</strong>: All pricing,
            contracting, and service agreements are finalized directly between
            the SME and the logistics provider outside the Goods2Load platform.
            <br />
            <br />
          </li>
          <li>
            Goods2Load facilitates visibility and connectivity but does not act
            as an intermediary or booking platform.
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
      "You won't be booking your logistic service directly on Goods2Load, nor will you make payments for your logistic service through our platform but you will seamlessly continue the process on the logistic provider's platform to finalize and define the service according to your requirements.",
  },
  {
    number: '03',
    title: 'What happens after you connect with a partner?',
    content:
      "After agreeing with the freight forwarders on the price, you will proceed to make the payment directly with them. Following this, you'll receive a confirmation of your booking from your chosen logistic provider. They will then initiate the logistics process, which could include picking up your goods, transporting them to the designated destination, and delivering them as per the agreed-upon terms. Throughout this process, you can monitor the progress of your shipment using the provided tracking information if provided.",
  },
  {
    number: '04',
    title: 'How to join as a verified freight forwarder?',
    content:
      'Become a verified freight forwarder with a simple annual\n' +
      'subscription and professional onboarding support. Your private digital ID\n' +
      'page will showcase your company with a clear description, services\n' +
      'offered, certifications, Google reviews and Maps, WhatsApp Business,\n' +
      'YouTube interviews, and direct contact options for shippers, including your\n' +
      'business email. We implement a targeted SEO strategy to drive traffic and\n' +
      'generate qualified leads straight to your page. Your private dashboard lets\n' +
      'you track leads, monitor sales performance, and analyze market\n' +
      'trends—all while keeping full control over your pricing and lead generation,\n' +
      'with no commission fees or bidding wars.',
  },
  // {
  //   number: '05',
  //   title: 'CAN I BOOK A LOGISTIC SERVICE THAT EMIT LESS CO2?',
  //   content:
  //     'Yes, many logistic service providers offer eco-friendly options that emit less CO2. When booking a logistic service through Goods2Load, you can use filters to search for environmentally friendly options. Look for providers that offer green or sustainable logistics solutions, such as those using electric or hybrid vehicles, optimizing routes for efficiency. Additionally, some providers may offer carbon offset programs to mitigate the environmental impact of shipping. Double-check how much carbon emissions you have saved and receive your GREENCOIN reward, facilitating purchases of more and more green services to help preserve the planet!',
  // },
  {
    number: '05',
    title: "WHAT IS 'SOLUTION FINDER?'",
    content:
      "'SOLUTION FINDER' is a feature that allows our users to set notifications for specific route and relevant details. When the SOLUTION of the selected service reaches the designated level, the user receives an alert via email, SMS, or through the platform itself. Solutions Finder are useful for consumers and investors who want to shipping options to make informed decisions about purchasing or selling goods globally.",
  },
  {
    number: '06',
    title:
      'How can I, as a shipper, use Goods2Load to find the right logistics partner?',
    content:
      'As a shipper, you can access Goods2Load completely free of charge. Our platform lets you filter verified freight forwarders by service type (air, sea, road), certifications, and CO2 offset options. Each provider has a professional digital ID page with clear service details, reviews, maps, and direct contact options—so you can connect instantly, without commissions or hidden fees. This ensures you choose the right logistics partner with full transparency, speed, and confidence.',
  },
  //   {
  //     number: '07',
  //     title: 'How long does cargo shipping take from Dubai to other countries?',
  //     content: `Shipping times from Dubai vary depending on the destination and mode of transport. Air freight typically takes 1-5 days for most
  // international destinations, while sea freight can range from 7-40 days. Factors such as customs clearance and local delivery also
  // affect overall transit times.`,
  //   },
  //   {
  //     number: '08',
  //     title: 'What documents are required for cargo shipping?',
  //     content: `Essential documents for cargo shipping include commercial invoices, packing lists, and certificates of origin. Depending on the
  // nature of the goods, additional documents like import/export permits, health certificates, or dangerous goods declarations may be
  // required. Our team can guide you through the specific documentation needed for your shipment.`,
  //   },
  //   {
  //     number: '09',
  //     title: 'What is the difference between cargo and logistics services?',
  //     content: `Cargo services primarily focus on the transportation of goods from one point to another. Logistics services, on the other hand,
  // encompass a broader range of activities including transportation, warehousing, inventory management, packaging, and
  // distribution. Logistics involves the entire supply chain process, ensuring efficient flow of goods from manufacturer to end
  // consumer.`,
  //   },
  //   {
  //     number: '10',
  //     title: 'How much does cargo shipping cost in Dubai?',
  //     content: `Cargo shipping costs in Dubai vary based on factors such as shipment size, destination, mode of transport, and service level. It can
  // range from $3,000 to $9,000 and more.`,
  //   },
  //   {
  //     number: '11',
  //     title:
  //       'What are the benefits of using a logistics company based in the UAE?',
  //     content: `Using a logistics company in the UAE offers numerous benefits, including expertise in local regulations, access to established
  // shipping networks, and cost-effective solutions through economies of scale. Logistics companies also provide value-added services
  // like customs clearance, warehousing, and last-mile delivery, streamlining your entire supply chain process.`,
  //   },
];

export default function Home() {
  return (
    <>
      <MainImageLayout>
        <HeaderClient variant="transparent" />
        <DynamicMenu variant="transparent" />
        <div className="px-4 max-w-[1250px] mx-auto text-center">
          <h1 className="md:mt-[120px] mt-12 font-light text-[30px]/[36px] md:text-[50px]/[55px] mb-4">
            Find <i>Trusted Freight Partners</i> - or Grow as One
          </h1>
          <p className="font-medium md:text-2xl mb-4">
            Goods2Load connects businesses with verified freight forwarders in
            the UAE and worldwide, <br />
            without middlemen cost.
          </p>
          <p className="mx-auto text-lg max-md:text-sm">
            The platform provides freight forwarders with digital tools to
            enhance visibility and generate qualified leads. <br />
            Shippers have free, instant access to a trusted network of providers
            from all over the world.
          </p>
          <Link
            href={'/partners'}
            className="inline-block py-2.5 px-4 mt-8 border rounded-[48px] decoration-none hover:bg-white hover:text-[#FF6720] hover:no-underline transition duration-300 ease"
            target={'_blank'}
          >
            Search Freight Providers
          </Link>
        </div>
      </MainImageLayout>
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main max-w-full">
        <div className="mt-[-130px] sm:mt-[-160px] mb-20 w-full px-[16px] max-w-[1328px] mx-auto">
          <SearchMain main />
        </div>

        <section className="conecting-section w-full px-[16px] max-w-[1328px] mx-auto mb-12">
          <h2 className="text-black text-[30px] sm:text-[40px] mb-2 text-center">
            Goods2Load — Connecting
            <i className="bg-allTittleColor px-2 mx-1 rounded-md inline-block">
              Shippers
            </i>
            and
            <i className="bg-allTittleColor px-2 mx-1 rounded-md inline-block">
              Freight Forwarders
            </i>{' '}
          </h2>
          <strong className="block font-medium text-xl mb-4 text-center md:text-left">
            Goods2Load is not a logistics company. We don’t move goods ourselves
            — instead, we connect businesses with reliable freight partners who
            can.
          </strong>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-4 my-8">
            <div className="flex flex-row items-center gap-4 border border-[#FF6720] rounded-2xl p-4">
              <Image
                className="w-[160px] h-[160px] md:w-[160px] md:h-[160px] mx-[-30px] scale-125"
                src={Icon1}
                alt="image"
                width={160}
                height={160}
              />
              <div>
                <h3 className="text-[18px] lg:text-[22px]/[24px] text-center font-medium mb-4">
                  Shippers:
                </h3>
                <p className="text-black text-[16px] text-center pb-4">
                  Get free access to a network of vetted freight forwarders — no
                  subscription, no hidden fees.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 border border-[#FF6720] rounded-2xl p-4">
              <Image
                className="w-[160px] h-[160px] md:w-[160px] md:h-[160px] mx-[-30px] scale-125"
                src={Icon2}
                alt="image"
                width={160}
                height={160}
              />
              <div>
                <h3 className="text-[18px] lg:text-[22px]/[24px] text-center font-medium mb-4">
                  Freight Forwarders:
                </h3>
                <p className="text-black text-[16px] text-center pb-4">
                  Gain a powerful digital sales tool that boosts your
                  visibility, trust, and lead generation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*<PartnersOurPartners />*/}
        <SubHeaderMain />
        <TailoredServices />
        <ExpandYourReach />
        <SliderMain />
        <WhyChooseG2L />
        <DigitalAlliances />
        <QuestionsAndAnswers data={questionsContent} />
      </main>
      <Footer />
      {/* <GDPRAiPopup /> */}
      <ConsentPopup />
    </>
  );
}
