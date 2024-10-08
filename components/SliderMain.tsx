"use client";

const DotButton = (props: any) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import useDotButton from "@/app/hooks/useDotButton";

export default function SliderMain() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section
      className="embla overflow-hidden relative min-h-[412px]"
      ref={emblaRef}
    >
      <div className="embla__container flex">
        <div
          className={`embla__slide flex-[0_0_100%] ${selectedIndex === 0 && "is-selected"}`}
        >
          <img
            src="/slide1.png"
            className="w-full object-cover min-h-96"
            alt={"slide10-bg"}
          />
        </div>
        <div
          className={`embla__slide flex-[0_0_100%] ${selectedIndex === 1 && "is-selected"}`}
        >
          <img
            src="/slide2.png"
            className="w-full object-cover min-h-96"
            alt={"slide2-bg"}
          />
        </div>
        <div
          className={`embla__slide flex-[0_0_100%] ${selectedIndex === 2 && "is-selected"}`}
        >
          <img
            src="/slide3.png"
            className="w-full object-cover min-h-96"
            alt={"slide3-bg"}
          />
        </div>
      </div>
      <img src="/slide1.png" className="w-full relative z-0" />
      <div className="absolute top-0 left-0 z-10 w-full h-[100%] flex flex-wrap content-center">
        <div className="w-full px-[16px] max-w-[1328px] mx-auto">
          <div className="lg:w-1/2">
            <div className="italic text-[30px]/[34px] sm:text-[40px]/[48px]">
              Expand Your Reach:
            </div>
            <div className="italic text-[30px]/[34px] sm:text-[40px]/[48px] font-light mb-[20px]">
              Partner with G2L
            </div>
            <div className="text-[16px]/[22px] mb-[5px]">
              Tap into millions of businesses seeking better shipping solutions
              to grow. Join us to streamline your delivery process and boost
              your business effortlessly.
            </div>
            <Link className="text-orangePrimary font-medium" href="/partners">
              Learn more
            </Link>
          </div>
        </div>
      </div>
      <div className="embla__controls absolute bottom-[60px] left-[50%] translate-x-[-50%] z-10 flex flex-col">
        <div className="embla__dots self-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot w-[12px] h-[12px] w rounded-full mx-[6px] border border-orangePrimary".concat(
                index === selectedIndex
                  ? " bg-orangePrimary"
                  : " bg-transparent"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
