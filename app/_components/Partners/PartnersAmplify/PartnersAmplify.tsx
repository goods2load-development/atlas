import { opportunitiesData } from './opportunitiesData';
import { OpportunitiesData } from '@/app/interface/PartnersAmplify';
import macBookImage from '@/assets/PartnersImage/PartnersAmplify/macbookProMockup.png';

import React from 'react';

import Image from 'next/image';

const PartnersAmplify: React.FC = () => {
  return (
    <section className="w-full bg-bgPartnersAmplify bg-cover bg-center mb-[230px]">
      <div className="bg-bgPartnersAmplifyShadow">
        <div className="relative flex flex-col w-full items-end justify-center pt-[40px] sm:pt-[47px] text-white text-center pb-[100px]  sm:pb-[270px] lg:pb-[100px] sm:pr-[100px] max-w-[1328px] mx-auto">
          <div className="absolute top-0 right-0 w-[1540px] h-full text-white text-center pb-[100px] pt-[150px] mb-[110px]" />
          <div className="absolute left-0 bottom-0 transform translate-y-[220px] md:translate-y-[115px]">
            <Image
              className="w-full sm:w-[489px] sm:h-[330px] md:w-[533px] md:h-[330px]  lg:w-[733px] lg:h-[430px]"
              src={macBookImage}
              alt=""
            />
          </div>
          <div className="sm:flex flex-col z-40">
            <div className="text-[28px]/[32px] sm:text-[48px]/[57px] font-medium sm:pt-[120px] mb-[20px] max-w-[268px] sm:max-w-[483px] text-center sm:text-left  mx-auto sm:mx-0">
              Amplify your voice to reach those who matter most
            </div>
            <h2 className="w-full sm:text-[17px]/[28px] max-w-[484px] sm:text-left leading-[28px] mb-[30px] px-5 sm:px-0">
              We’ve developed our platform to swiftly skim and analyze real-time
              company search data., empowering you to pinpoint high-demand
              routes and launch ad campaigns swiftly.
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
