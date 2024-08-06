"use client";
import useDotButton from "@/app/hooks/useDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function TailoredServices() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="px-[16px] py-[104px] w-full max-w-[1328px] mx-auto lg:bg-bgLogistics bg-no-repeat bg-cover">
      <h2 className="text-black text-[40px] sm:text-[30px]/[34px] mb-2">
        <i className="bg-allTittleColor px-2 rounded-md">
          Empower Your Business
        </i>{" "}
        with <span className="font-light">Tailored Services</span>
      </h2>
      <p className="max-w-[344px] font-light text-lg mb-10">
        Unlock Your Business&apos;s Full Potential with Our Customized Solutions
      </p>
      <div className="embla relative min-h-[412px] mx-auto" ref={emblaRef}>
        <div className="embla__container flex">
          <div
            className={`embla__slide flex-[0_0_100%] ${selectedIndex === 0 && "is-selected"}`}
          >
            <div className="bg-black h-full rounded-2xl overflow-hidden"></div>
          </div>
          <div
            className={`embla__slide flex-[0_0_100%] ${selectedIndex === 1 && "is-selected"}`}
          >
            <div className="bg-black h-full rounded-2xl overflow-hidden"></div>
          </div>
          <div
            className={`embla__slide flex-[0_0_100%] ${selectedIndex === 2 && "is-selected"}`}
          >
            <div className="bg-black h-full rounded-2xl overflow-hidden"></div>
          </div>
        </div>

        <div className="embla__controls absolute -bottom-8 left-[50%] translate-x-[-50%] z-10 flex flex-col">
          <div className="embla__dots self-center">
            {scrollSnaps.map((_, index) => (
              <button
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
      </div>
    </div>
  );
}
