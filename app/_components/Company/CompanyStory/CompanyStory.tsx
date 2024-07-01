import React from "react";
import Image, { StaticImageData } from "next/image";

import { storyBlock } from "./CompanyStoryData";
import CompanyStoryBlock from "@/app/_components/Company/CompanyStory/CompanyStoryBlock";
import line from "@/assets/line-dashed.svg";

export interface IBlock {
  icon: string | StaticImageData;
  time: string;
  info: string;
  more: boolean;
}

const CompanyStory = () => {
  return (
    <section className="w-full flex flex-col gap-[40px] py-14 sm:py-[104px]">
      <div className="flex flex-col gap-[16px] text-start text-black px-5 md:px-[72px]">
        <h1 className="font-normal sm:text-[48px]/[57.6px] text-[34px]/[38px] italic flex flex-row gap-[12px] justify-center sm:justify-start ">
          Our{" "}
          <div className="font-light not-italic bg-[#FEF1DF] rounded-[6px] sm:h-[49px] px-[4px] flex justify-center items-center relative sm:bottom-[-5px]">
            story
          </div>
        </h1>
        <p className="max-w-[830px] font-normal sm:text-[18px]/[25px] sm:text-left text-center">
          Thanks to constant growth and development, we are rapidly expanding
          our market presence and providing our customers with the highest
          quality service
        </p>
      </div>
      <div className="hidden sm:flex flex-row flex-wrap gap-[40px] justify-center relative px-5 md:px-[72px]">
        <div className="sm:block absolute inset-0 top-[47px] h-fit z-[-1] ml-[-5%] overflow-hidden flex flex-row gap-1 right-0 left-0">
          <Image
            className="w-full animate-infinite-scroll"
            src={line}
            alt={"line"}
          />
          <Image
            className="w-full animate-infinite-scroll"
            src={line}
            alt={"line"}
          />
        </div>
        {storyBlock.map((item: IBlock) => (
          <CompanyStoryBlock key={item.time} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CompanyStory;
