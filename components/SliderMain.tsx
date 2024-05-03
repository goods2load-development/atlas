"use client";
import React, { useCallback, useEffect, useState } from "react";

const useDotButton = (emblaApi: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index: any) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const DotButton = (props: any) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link";

export default function SliderMain() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        <div className="embla__slide flex-[0_0_100%] relative">
          <img src="/slide1.png" className="w-full" />
          <div className="absolute top-0 left-0 w-6/12 mw-[100%] h-[100%] px-16 flex flex-wrap content-center">
            <div>
              <div className="italic text-[40px]/[48px]">
                Expand Your Reach:
              </div>
              <div className="italic text-[40px]/[48px] font-light mb-[20px]">
                Partner with G2L
              </div>
              <div className="text-[16px]/[22px] mb-[5px]">
                Tap into millions of businesses seeking better shipping
                solutions to grow. Join us to streamline your delivery process
                and boost your business effortlessly.
              </div>
              <Link className="text-orangePrimary font-semibold" href="/">
                Learn more
              </Link>
            </div>
          </div>
        </div>
        <div className="embla__slide flex-[0_0_100%] relative">
          <img src="/slide2.png" className="w-full" />
          <div className="absolute top-0 left-0 w-6/12 mw-[100%] h-[100%] px-16 flex flex-wrap content-center">
            <div>
              <div className="italic text-[40px]/[48px]">
                Expand Your Reach:
              </div>
              <div className="italic text-[40px]/[48px] font-light mb-[20px]">
                Partner with G2L
              </div>
              <div className="text-[16px]/[22px] mb-[5px]">
                Tap into millions of businesses seeking better shipping
                solutions to grow. Join us to streamline your delivery process
                and boost your business effortlessly.
              </div>
              <Link className="text-orangePrimary font-semibold" href="/">
                Learn more
              </Link>
            </div>
          </div>
        </div>
        <div className="embla__slide flex-[0_0_100%] relative">
          <img src="/slide3.png" className="w-full" />
          <div className="absolute top-0 left-0 w-6/12 mw-[100%] h-[100%] px-16 flex flex-wrap content-center">
            <div>
              <div className="italic text-[40px]/[48px]">
                Expand Your Reach:
              </div>
              <div className="italic text-[40px]/[48px] font-light mb-[20px]">
                Partner with G2L
              </div>
              <div className="text-[16px]/[22px] mb-[5px]">
                Tap into millions of businesses seeking better shipping
                solutions to grow. Join us to streamline your delivery process
                and boost your business effortlessly.
              </div>
              <Link className="text-orangePrimary font-semibold" href="/">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="embla__controls relative bottom-[60px] z-10 flex flex-col">
        <div className="embla__dots self-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot w-[12px] h-[12px] rounded-full mx-[6px] bg-orangePrimary border-2 border-orangePrimary".concat(
                index === selectedIndex
                  ? " embla__dot--selected bg-transparent"
                  : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
