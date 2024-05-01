import React from "react";
import Image, { StaticImageData } from "next/image";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { sliderData } from "./sliderData";

import stars from "@/assets/stars.svg";
import trustpilot from "@/assets/trustpilot.svg";
import google from "@/assets/google.svg";

const TrustReputation = () => {
  return (
    <section className='w-full max-w-[1440px] flex flex-col items-center gap-[16px]'>
      <h1 className='text-black text-center font-light text-[40px]/[48px] flex'>Our
        <div
          className='font-normal italic bg-[#FEF1DF] rounded-[6px] h-[49px] px-[8px] ml-2 flex justify-center items-center'>reputation</div>
        speaks for itself
      </h1>

      <div className="w-full flex flex-row justify-evenly pt-8 pb-5">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 w-full max-w-[1000px]">
            {sliderData.map((it, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image src={it.sliderImg} alt={it.alt} />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-fit text-black text-[17px]/[23px] flex flex-row gap-[10px] font-medium pb-4">
        {" "}
        <div>1,000+</div>
        <Image className="relative top-[-3px]" src={stars} alt={"stars"} />{" "}
        <div>reviews</div>
      </div>
      <div className="w-fit flex flex-row gap-4 ">
        {" "}
        <Image
          className="relative top-[-3px]"
          src={trustpilot}
          alt={"trustpilot"}
        />{" "}
        <Image className="relative top-[-3px]" src={google} alt={"google"} />
      </div>
    </section>
  );
};

export default TrustReputation;
