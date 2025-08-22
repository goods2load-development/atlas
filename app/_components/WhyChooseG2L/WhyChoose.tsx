import Icon1 from '@/assets/images/WhyChooseUs/1.svg';
import Icon2 from '@/assets/images/WhyChooseUs/3.svg';
import Icon3 from '@/assets/images/WhyChooseUs/4.svg';
import Icon4 from '@/assets/images/WhyChooseUs/5.svg';
import Icon5 from '@/assets/images/WhyChooseUs/6.svg';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

const icons = [Icon1, Icon2, Icon3, Icon4, Icon5];

interface CardProps {
  id: string;
  title: string;
  text: string;
}
const CardsData: CardProps[] = [
  {
    id: '1',
    title: 'For Shippers',
    text:
      '100% free to use — connect directly with verified freight forwarders,\n' +
      'no subscriptions or hidden fees.',
  },
  {
    id: '2',
    title: 'For Freight Forwarders',
    text: 'A proven sales tool to boost visibility, generate leads, and grow your business.',
  },
  {
    id: '3',
    title: 'Verified Partners Only',
    text:
      'Build trust with profiles that feature Google reviews and\n' +
      'official certifications.',
  },
  {
    id: '4',
    title: 'Global Reach, Local Trust',
    text: 'Find or serve customers across the GCC and worldwide.',
  },
  {
    id: '5',
    title: 'Data-Driven Growth',
    text: 'Access a private dashboard for lead tracking and sales insights.',
  },
];

const WhyChoose: React.FC = () => {
  return (
    <section
      className={
        'w-full flex flex-col items-center md:items-start mx-auto px-4 mb-20 pt-20'
      }
    >
      <div className=" flex flex-col max-w-[1328px] mx-auto items-center ">
        <h2 className="text-[30px] sm:text-[40px] mb-6 text-center md:text-left font-normal">
          Why Choose
          <i className="bg-allTittleColor px-2 mx-1 rounded-md font-medium inline-block text-black">
            Goods2Load
          </i>
          ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {CardsData.map((card, idx) => (
            <div
              key={card.id}
              className="flex flex-col flex-wrap items-center gap-1 px-4 border border-[#FF6720] rounded-2xl"
            >
              <Image
                className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] mx-auto mb-[-25px]"
                src={icons[idx]}
                alt="image"
                width={90}
                height={90}
              />
              <h3 className="text-[18px] lg:text-[22px]/[24px] text-center font-medium mb-4">
                {card.title}
              </h3>
              <p className="text-black text-[16px] text-center pb-4">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <p>Join the UAE’s Fastest-Growing Freight Connection Platform Today</p>

        <Link
          href={'mailto:hey@goods2load.com'}
          className="md:w-fit w-full py-2.5 px-8 mt-8 bg-[#FF6720] text-white border rounded-[48px] hover:bg-white hover:text-[#FF6720] text-center hover:border-[#FF6720] hover:no-underline transition duration-300 ease"
          target={'_blank'}
        >
          Contact →
        </Link>
      </div>
    </section>
  );
};

export default WhyChoose;
