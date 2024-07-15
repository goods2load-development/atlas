"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const useDotButton = (emblaApi: any, countItems: number) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index: any) => {
      if (!emblaApi) return;
      setSelectedIndex(index);
    },
    [emblaApi]
  );

  const onNextItem = () => {
    if (countItems > selectedIndex) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedIndex(0);
    }
  };

  const onPrevItem = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedIndex(countItems);
    }
  };

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
    onNextItem,
    onPrevItem,
  };
};

import useEmblaCarousel from "embla-carousel-react";
import { storyBlock } from "../CompanyStoryData";
import CompanyStoryBlock from "../CompanyStoryBlock";

export default function CompanyStoryMobileSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
    onNextItem,
    onPrevItem,
  } = useDotButton(emblaApi, storyBlock.length - 1);

  const DotButton = (props: any) => {
    const { children, ...restProps } = props;

    return (
      <button type="button" {...restProps}>
        {children}
      </button>
    );
  };

  return (
    <>
      <div
        className="sm:hidden embla overflow-visible min-h-[352px] w-full relative"
        ref={emblaRef}
      >
        <div className="embla__container flex text-black overflow-y-scroll">
          {storyBlock.map((item, i) => {
            return (
              <div
                key={i}
                className={`embla__slide flex-[0_0_100%] pt-2 ${selectedIndex === i && "is-selected"}`}
              >
                <CompanyStoryBlock item={item} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex sm:hidden justify-between  z-50 px-16 bottom-[-5%] w-full mt-2 mb-20">
        <button
          className="w-[44px] h-[44px] flex items-center justify-center bg-primaryOrange rounded-full"
          onClick={onPrevItem}
        >
          <ChevronLeft />
        </button>
        <div className="embla__dots self-center">
          {storyBlock.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot w-[12px] h-[12px] rounded-full mx-[6px]".concat(
                index === selectedIndex
                  ? " bg-[#000] scale-[1.1]"
                  : " bg-[#000] opacity-20"
              )}
            />
          ))}
        </div>
        <button
          className="w-[44px] h-[44px] flex items-center justify-center bg-primaryOrange rounded-full"
          onClick={onNextItem}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
}
