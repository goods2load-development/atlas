import { AlliancesData } from '@/app/_components/Alliances/AlliancesData';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

const DigitalAlliances = () => {
  return (
    <section
      id="our-allinces"
      className={'w-full items-center max-w-[1328px] mx-auto px-4 mb-10 pt-10'}
    >
      <h2 className="text-black text-center font-light md:text-[40px]/[48px] text-[34px]/[38px] flex flex-wrap gap-1 mb-8 justify-center">
        <span className="font-normal italic bg-[#FEF1DF] rounded-[6px] px-[8px] mr-3 flex justify-center items-center">
          Strategic
        </span>
        Digital
        <span className="font-normal italic bg-[#FEF1DF] rounded-[6px] px-[8px] ml-3 flex justify-center items-center">
          Alliance
        </span>
      </h2>
      <div className="flex w-full text-black gap-2 flex-wrap justify-center lg:justify-start">
        {AlliancesData.map(({ id, image, title, link }) => {
          const baseCardClasses =
            'w-[350px] h-[265px] md:w-[350px] md:h-[265px] relative overflow-hidden flex items-center justify-center';

          const imageClasses =
            'bg-contain bg-no-repeat h-full bg-center object-contain';

          const imageElement = (
            <Image
              src={image}
              alt={title}
              className={imageClasses}
              style={{ width: 'auto', height: 'auto' }}
            />
          );
          return link ? (
            <a
              key={id + title}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(baseCardClasses, 'cursor-pointer')}
            >
              {imageElement}
            </a>
          ) : (
            <div key={id + title} className={baseCardClasses}>
              {imageElement}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DigitalAlliances;
