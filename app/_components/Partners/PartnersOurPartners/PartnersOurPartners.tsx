"use client";
import React from "react";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { sliderData } from "@/app/_components/Partners/PartnersOurPartners/sliderData";
import Autoplay from "embla-carousel-autoplay";

const PartnersOurPartners: React.FC = () => {
  return (
    <section id="our-partners" className="w-full  items-center">
      <div className="text-black text-center font-light md:text-[40px]/[48px] text-[34px]/[38px] flex px-[16px] max-w-[1328px] mx-auto">
        Our
        <div className="font-normal italic bg-[#FEF1DF] rounded-[6px] md:h-[49px] px-[8px] ml-2 flex justify-center items-center">
          partners
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full flex flex-row justify-evenly">
          <Carousel
            className="w-full"
            opts={{ loop: true, duration: 3000 }}
            plugins={[Autoplay({ delay: 0 })]}
          >
            <CarouselContent className="-ml-1 w-full">
              {sliderData.map((it, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/2 lg:basis-1/4 grid items-center"
                >
                  <CardContent className="flex items-center justify-center">
                    <Image src={it.sliderImg} alt={it.alt} />
                  </CardContent>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PartnersOurPartners;
