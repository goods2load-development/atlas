import { opportunitiesData } from './opportunitiesData';
import { OpportunitiesData } from '@/app/interface/PartnersAmplify';
import macBookImage from '@/assets/PartnersImage/PartnersAmplify/macbookProMockup.png';

import React from 'react';

import Image from 'next/image';

const PartnersAmplify: React.FC = () => {
  return (
    <section className="w-full bg-bgPartnersAmplify bg-cover bg-center relative">
      <div className="bg-bgPartnersAmplifyShadow">
        <div className="relative flex flex-col w-full items-end justify-center pt-[40px] sm:pt-[47px] text-white text-center pb-[140px] sm:pb-[270px] lg:pb-[100px] sm:pr-[100px] max-w-[1328px] mx-auto">
          <div className="absolute top-0 right-0 w-[1540px] h-full text-white text-center pb-[100px] pt-[150px] mb-[110px]" />
          {/* MacBook Image */}
          <div className="w-full lg:w-1/2 absolute left-1/2 bottom-0 lg:-left-[72px] lg:bottom-[-72px] transform max-lg:-translate-x-1/2 max-lg:translate-y-1/2">
            <Image
              className="w-full mx-auto max-lg:max-w-[500px] lg:w-[min(100%,772px)]"
              src={macBookImage}
              alt="pc-image"
            />
          </div>
          {/* Content */}
          <div className="sm:flex flex-col z-40">
            <div className="text-[28px]/[32px] sm:text-[48px]/[57px] font-medium sm:pt-[120px] mb-[20px] max-w-[268px] sm:max-w-[483px] text-center sm:text-left  mx-auto sm:mx-0">
              Amplify your voice to reach those who matter most
            </div>
            <h2 className="w-full sm:text-[17px]/[28px] max-w-[484px] sm:text-left leading-[28px] mb-[30px] px-5 sm:px-0">
              We’ve developed our platform to swiftly skim and analyze real-time
              company search data, empowering you to pinpoint high-demand routes
              and launch ad campaigns swiftly.
            </h2>
            {opportunitiesData.map(
              ({ opportunity }: OpportunitiesData, i: number) => (
                <div
                  className="w-full flex gap-[12px] sm:gap-[30px] mb-[10px] items-center px-5 sm:px-0"
                  key={i}
                >
                  <div className="bg-primaryOrange rounded-[50px] min-w-[32px] w-[32px] sm:w-[50px] h-[32px] sm:h-[50px] flex justify-center pt-[5px] sm:pt-[14px]">
                    {i + 1}
                  </div>
                  <div className="text-[18px] max-w-[400px] text-left">
                    {opportunity}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersAmplify;
