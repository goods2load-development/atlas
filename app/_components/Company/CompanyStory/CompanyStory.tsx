import React from "react";
import Image, { StaticImageData } from "next/image";

import { storyBlock } from "./CompanyStoryData";
import CompanyStoryBlock from "@/app/_components/Company/CompanyStory/CompanyStoryBlock";
import line from "@/assets/line-dashed.svg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

export interface IBlock {
  icon: string | StaticImageData;
  time: string;
  info: string;
  more: boolean;
}

const CompanyStory = () => {
  return (
    <section className="w-full flex flex-col gap-[40px] py-14 sm:py-[104px]">
      <div className="flex flex-col gap-[16px] text-start text-black px-[16px] w-full max-w-[1328px] mx-auto">
        <h2 className="font-normal sm:text-[48px]/[57.6px] text-[34px]/[38px] italic flex flex-row gap-[12px] justify-center sm:justify-start">
          Our{" "}
          <div className="font-light not-italic bg-[#FEF1DF] rounded-[6px] sm:h-[49px] px-[4px] flex justify-center items-center relative sm:bottom-[-5px]">
            story
          </div>
        </h2>
        <p className="max-w-[830px] font-normal lg:text-[18px]/[25px] sm:text-left text-center">
          Thanks to constant growth and development, we are rapidly expanding
          our market presence and providing our customers with the highest
          quality service
        </p>
      </div>
      <div className="hidden md:flex flex-row flex-wrap gap-[40px] justify-center relative overflow-hidden pt-2 no-ba">
        <div className="md:block absolute inset-0 top-[53px] h-fit z-[-1] scale-[1.5] overflow-hidden flex flex-row gap-1 right-0 left-0 w-full">
          <Carousel
            className="w-full flex items-center overflow-hidden"
            opts={{ loop: true, duration: 10000 }}
            plugins={[Autoplay({ delay: 0 })]}
          >
            <CarouselContent className="-pl-1 flex items-center">
              <CarouselItem className="pl-1 basis-1/2 lg:basis-1/2 grid items-center">
                <Image height={200} src={line} alt={"line"} />
              </CarouselItem>
              <CarouselItem className="pl-1 basis-1/2 lg:basis-1/2 grid items-center">
                <Image className="" src={line} alt={"line"} />
              </CarouselItem>
              <CarouselItem className="pl-1 basis-1/2 lg:basis-1/2 grid items-center">
                <Image className="" src={line} alt={"line"} />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        {storyBlock.map((item: IBlock) => (
          <CompanyStoryBlock key={item.time} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CompanyStory;
