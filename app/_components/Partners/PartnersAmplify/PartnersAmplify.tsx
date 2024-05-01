import React from "react";
import Image from "next/image";

import { opportunitiesData } from "./opportunitiesData";

import macBookImage from "@/assets/PartnersImage/PartnersAmplify/macbookProMockup.png";
import { OpportunitiesData } from "@/app/interface/PartnersAmplify";

const PartnersAmplify: React.FC = () => {
  return (
    <div className="flex relative flex-col w-full items-end justify-center pt-[47px] bg-bgPartnersAmplify bg-cover bg-center text-white text-center pb-[100px] pt-[150px] mb-[230px] pr-[100px]">
      <div className="absolute top-0 right-0 w-[1540px] h-full bg-bgPartnersAmplifyShadow bg-cover bg-center text-white text-center pb-[100px] pt-[150px] mb-[110px]" />
      <div className="absolute bottom-0 transform translate-y-[115px] left-20">
        <Image src={macBookImage} alt="" />
      </div>
      <div className="flex flex-col z-40">
        <div className="text-[48px] max-w-[500px] leading-[57px] font-light mb-2 pt-[120px] mb-[20px] max-w-[1000px] text-left">
          Amplify your voice to reach those who matter most
        </div>
        <h2 className="w-full text-[17px]/[28px] max-w-[484px] font-light text-left leading-[28px] mb-[30px]">
          We’ve developed our platform to swiftly skim and <br />
          analyze real-time company search data.,
          <br /> empowering you to pinpoint high-demand routes
          <br /> and launch ad campaigns swiftly.
        </h2>

        {opportunitiesData.map(
          ({ opportunity }: OpportunitiesData, i: number) => (
            <div
              className="w-full flex gap-[30px] mb-[10px] items-center"
              key={i}
            >
              <div className="bg-primaryOrange rounded-[50px] w-[50px] h-[50px] flex justify-center pt-[14px]">
                {i + 1}
              </div>
              <div className="text-[18px] max-w-[400px] text-left">
                {opportunity}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default PartnersAmplify;
