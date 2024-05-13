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
    <section className="w-full max-w-[1440px] items-center">
      <div className="text-black text-center font-light text-[40px]/[48px] flex px-[72px]">
        Our
        <div className="font-normal italic bg-[#FEF1DF] rounded-[6px] h-[49px] px-[8px] ml-2 flex justify-center items-center">
          partners
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full flex flex-row justify-evenly">
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
          >
            <CarouselContent className="-ml-1 w-full max-w-[1000px] ">
              {sliderData.map((it, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <CardContent className="flex aspect-square items-center justify-center">
                      <Image src={it.sliderImg} alt={it.alt} />
                    </CardContent>
                  </div>
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
