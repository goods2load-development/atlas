import { generateDefaultMetadata } from '@/lib/metadataUtils';

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

const title =
  'Top Logistics Company | Cargo Services Globally and Across GCC Countries';
const description =
  'Discover the best cargo and logistics companies globally and across the GCC countries. Our top-rated services ensure efficient and reliable solutions for all shipping needs.';

export function generateMetadata(): Metadata {
  const defaultMetadata = generateDefaultMetadata();

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
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
  {
    number: '06',
    title: 'How long does cargo shipping take from Dubai to other countries?',
    content: `Shipping times from Dubai vary depending on the destination and mode of transport. Air freight typically takes 1-5 days for most
international destinations, while sea freight can range from 7-40 days. Factors such as customs clearance and local delivery also
affect overall transit times.`,
  },
  {
    number: '07',
    title: 'What documents are required for cargo shipping?',
    content: `Essential documents for cargo shipping include commercial invoices, packing lists, and certificates of origin. Depending on the
nature of the goods, additional documents like import/export permits, health certificates, or dangerous goods declarations may be
required. Our team can guide you through the specific documentation needed for your shipment.`,
  },
  {
    number: '08',
    title: 'What is the difference between cargo and logistics services?',
    content: `Cargo services primarily focus on the transportation of goods from one point to another. Logistics services, on the other hand,
encompass a broader range of activities including transportation, warehousing, inventory management, packaging, and
distribution. Logistics involves the entire supply chain process, ensuring efficient flow of goods from manufacturer to end
consumer.`,
  },
  {
    number: '09',
    title: 'How much does cargo shipping cost in Dubai?',
    content: `Cargo shipping costs in Dubai vary based on factors such as shipment size, destination, mode of transport, and service level. It can
range from $3,000 to $9,000 and more.`,
  },
  {
    number: '10',
    title:
      'What are the benefits of using a logistics company based in the UAE?',
    content: `Using a logistics company in the UAE offers numerous benefits, including expertise in local regulations, access to established
shipping networks, and cost-effective solutions through economies of scale. Logistics companies also provide value-added services
like customs clearance, warehousing, and last-mile delivery, streamlining your entire supply chain process.`,
  },
];

export default function Home() {
  return (
    <>
      <MainImageLayout>
        <HeaderClient variant="transparent" />
        <DynamicMenu variant="transparent" />
        <div className="px-[16px] max-w-[1250px] mx-auto text-center">
          <h1 className="md:mt-[120px] mt-12 font-light text-[30px]/[36px] md:text-[50px]/[55px] mb-4">
            Find Top <i>Logistics Services</i> and <i>Cargo Companies</i>{' '}
            Globally and Across <i>GCC Countries</i>
          </h1>
          <p className="font-medium md:text-2xl mb-4">
            Get in touch with Cargo and Logistics Providers from around the
            world.
          </p>
          <p className="max-w-[760px] mx-auto text-lg max-md:text-sm">
            Goods2load stands out as a premier cargo and logistics provider. Our
            comprehensive suite of services meets the needs of businesses of all
            sizes, offering customized solutions for your shipping and supply
            chain need
          </p>
        </div>
      </MainImageLayout>
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main max-w-full">
        <div className="mt-[-120px] sm:mt-[-120px] mb-20 w-full px-[16px] max-w-[1328px] mx-auto">
          <SearchMain main />
        </div>
        <SubHeaderMain />
        <TailoredServices className="py-20 md:py-[104px]" />
        <SliderMain />
        <QuestionsAndAnswers data={questionsContent} />
        <Analytics />
      </main>
      <Footer />
      {/* <GDPRAiPopup /> */}
      <ConsentPopup />
    </>
  );
}
